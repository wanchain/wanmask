import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import { getMetaMaskAccounts, getMetaMaskAccountsConnected } from '../../../selectors'
import SelectHardware from './select-hardware'
import AccountList from './account-list'
import { formatBalance } from '../../../helpers/utils/util'
import { getMostRecentOverviewPage } from '../../../ducks/history/history'

const LEDGER_LIVE_PATH = `m/44'/5718350'/0'/0/0`
const MEW_PATH = `m/44'/5718350'/0'`
const TREZOR_PATH = `m/44'/5718350'/0'/0`
const WAN_LEGACY_PATH = `m/44'/60'/0'/0/0`
const WAN_LEGACY_MEW_PATH = `m/44'/60'/0'`
const WAN_LEGACY_TREZOR_PATH = `m/44'/60'/0'/0`

const HD_PATHS = [
  { label: 'Ledger Live', value: LEDGER_LIVE_PATH },
  { label: 'Legacy MyWanWallet', value: MEW_PATH },
  { label: 'Trezor MyWanWallet', value: TREZOR_PATH },
  { label: 'WAN Legacy Ledger Live', value: WAN_LEGACY_PATH },
  { label: 'WAN Legacy MEW / MyCrypto', value: WAN_LEGACY_MEW_PATH },
  { label: 'WAN Legacy Trezor', value: WAN_LEGACY_TREZOR_PATH },
];

class ConnectHardwareForm extends Component {
  state = {
    error: null,
    selectedAccounts: [],
    accounts: [],
    browserSupported: true,
    unlocked: false,
    device: null,
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { accounts } = nextProps
    const newAccounts = this.state.accounts.map((a) => {
      const normalizedAddress = a.address.toLowerCase()
      const balanceValue = (accounts[normalizedAddress] && accounts[normalizedAddress].balance) || null
      a.balance = balanceValue ? formatBalance(balanceValue, 6) : '...'
      return a
    })
    this.setState({ accounts: newAccounts })
  }


  componentDidMount () {
    this.checkIfUnlocked()
  }

  async checkIfUnlocked () {
    ['trezor', 'ledger'].forEach(async (device) => {
      const path = this.props.defaultHdPaths[device];
      const unlocked = await this.props.checkHardwareStatus(device, path)
      if (unlocked) {
        this.setState({ unlocked: true })
        this.getPage(device, 0, path)
      }
    })
  }

  connectToHardwareWallet = (device) => {
    if (this.state.accounts.length) {
      return null
    }

    // Default values
    this.getPage(device, 0, this.props.defaultHdPaths[device])
  }

  onPathChange = (path) => {
    this.props.setHardwareWalletDefaultHdPath({ device: this.state.device, path })
    this.setState({
      selectedAccounts: [],
    })
    this.getPage(this.state.device, 0, path)
  }

  onAccountChange = (account) => {
    this.setState({ selectedAccount: account.toString(), error: null })
    let { selectedAccounts } = this.state;
    if (selectedAccounts.includes(account)) {
      selectedAccounts = selectedAccounts.filter((acc) => account !== acc);
    } else {
      selectedAccounts.push(account);
    }
    this.setState({ selectedAccounts, error: null });
  }

  onAccountRestriction = () => {
    this.setState({ error: this.context.t('ledgerAccountRestriction') })
  }

  showTemporaryAlert () {
    this.props.showAlert(this.context.t('hardwareWalletConnected'))
    // Autohide the alert after 5 seconds
    setTimeout((_) => {
      this.props.hideAlert()
    }, 5000)
  }

  getPage = (device, page, hdPath) => {
    // console.log(`device=${device} page=${page} hdPath=${hdPath}`)
    this.props
      .connectHardware(device, page, hdPath)
      .then((accounts) => {
        if (accounts.length) {

          // If we just loaded the accounts for the first time
          // (device previously locked) show the global alert
          if (this.state.accounts.length === 0 && !this.state.unlocked) {
            this.showTemporaryAlert()
          }

          // Map accounts with balances
          const newAccounts = accounts.map((account) => {
            const normalizedAddress = account.address.toLowerCase()
            const balanceValue =
              this.props.accounts[normalizedAddress]?.balance || null
            account.balance = balanceValue ? formatBalance(balanceValue, 6) : '...'
            return account
          })

          this.setState({
            accounts: newAccounts,
            unlocked: true,
            device,
            error: null,
          })
        }
      })
      .catch((e) => {
        const errorMessage = e.message
        if (errorMessage === 'Window blocked') {
          this.setState({ browserSupported: false, error: null })
        } else if (errorMessage !== 'Window closed' && errorMessage !== 'Popup closed') {
          this.setState({ error: errorMessage })
        }
      })
  }

  onForgetDevice = (device) => {
    this.props.forgetDevice(device)
      .then((_) => {
        this.setState({
          error: null,
          selectedAccount: [],
          accounts: [],
          unlocked: false,
        })
      }).catch((e) => {
        this.setState({ error: e.message })
      })
  }

  onUnlockAccounts = (device, path) => {
    const { history, mostRecentOverviewPage, unlockHardwareWalletAccounts } = this.props
    const { selectedAccounts } = this.state;

    if (selectedAccounts.length === null) {
      this.setState({ error: this.context.t('accountSelectionRequired') })
    }

    const description = '';
    return unlockHardwareWalletAccounts(
      selectedAccounts,
      device,
      path || null,
      description,
      )
      .then((_) => {
        this.context.metricsEvent({
          eventOpts: {
            category: 'Accounts',
            action: 'Connected Hardware Wallet',
            name: 'Connected Account with: ' + device,
          },
        })
        history.push(mostRecentOverviewPage)
      }).catch((e) => {
        this.context.metricsEvent({
          eventOpts: {
            category: 'Accounts',
            action: 'Connected Hardware Wallet',
            name: 'Error connecting hardware wallet',
          },
          customVariables: {
            error: e.message,
          },
        })
        this.setState({ error: e.message })
      })
  }

  onCancel = () => {
    const { history, mostRecentOverviewPage } = this.props
    history.push(mostRecentOverviewPage)
  }

  renderError () {
    return this.state.error
      ? (
        <span
          className="error"
          style={{ margin: '20px 20px 10px', display: 'block', textAlign: 'center' }}
        >
          {this.state.error}
        </span>
      )
      : null
  }

  renderContent () {
    if (!this.state.accounts.length) {
      return (
        <SelectHardware
          connectToHardwareWallet={this.connectToHardwareWallet}
          browserSupported={this.state.browserSupported}
        />
      )
    }

    return (
      <AccountList
        onPathChange={this.onPathChange}
        selectedPath={this.props.defaultHdPaths[this.state.device]}
        device={this.state.device}
        accounts={this.state.accounts}
        connectedAccounts={this.props.connectedAccounts}
        selectedAccounts={this.state.selectedAccounts}
        onAccountChange={this.onAccountChange}
        network={this.props.network}
        getPage={this.getPage}
        onUnlockAccounts={this.onUnlockAccounts}
        onForgetDevice={this.onForgetDevice}
        onCancel={this.onCancel}
        onAccountRestriction={this.onAccountRestriction}
        hdPaths={HD_PATHS}
      />
    )
  }

  render () {
    return (
      <>
        {this.renderError()}
        {this.renderContent()}
      </>
    )
  }
}

ConnectHardwareForm.propTypes = {
  connectHardware: PropTypes.func,
  checkHardwareStatus: PropTypes.func,
  forgetDevice: PropTypes.func,
  showAlert: PropTypes.func,
  hideAlert: PropTypes.func,
  unlockHardwareWalletAccounts: PropTypes.func,
  setHardwareWalletDefaultHdPath: PropTypes.func,
  history: PropTypes.object,
  network: PropTypes.string,
  accounts: PropTypes.object,
  connectedAccounts: PropTypes.array.isRequired,
  defaultHdPaths: PropTypes.object,
  mostRecentOverviewPage: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  const {
    metamask: { network },
  } = state
  const accounts = getMetaMaskAccounts(state)
  const connectedAccounts = getMetaMaskAccountsConnected(state);
  const {
    appState: { defaultHdPaths },
  } = state

  return {
    network,
    accounts,
    connectedAccounts,
    defaultHdPaths,
    mostRecentOverviewPage: getMostRecentOverviewPage(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHardwareWalletDefaultHdPath: ({ device, path }) => {
      return dispatch(actions.setHardwareWalletDefaultHdPath({ device, path }))
    },
    connectHardware: (deviceName, page, hdPath) => {
      return dispatch(actions.connectHardware(deviceName, page, hdPath))
    },
    checkHardwareStatus: (deviceName, hdPath) => {
      return dispatch(actions.checkHardwareStatus(deviceName, hdPath))
    },
    forgetDevice: (deviceName) => {
      return dispatch(actions.forgetDevice(deviceName))
    },
    unlockHardwareWalletAccounts: (indexes, deviceName, hdPath, hdPathDescription) => {
      return dispatch(actions.unlockHardwareWalletAccounts(indexes, deviceName, hdPath, hdPathDescription))
    },
    showAlert: (msg) => dispatch(actions.showAlert(msg)),
    hideAlert: () => dispatch(actions.hideAlert()),
  }
}

ConnectHardwareForm.contextTypes = {
  t: PropTypes.func,
  metricsEvent: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ConnectHardwareForm,
)
