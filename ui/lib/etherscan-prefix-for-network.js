import * as networkEnums from '../../app/scripts/controllers/network/enums'

/**
 * Gets the wanscan.org URL prefix for a given network ID.
 *
 * @param {string} networkId - The network ID to get the prefix for.
 * @returns {string} The wanscan.org URL prefix for the given network ID.
 */
export function getEtherscanNetworkPrefix (networkId) {
  switch (networkId) {
    // case networkEnums.ROPSTEN_NETWORK_ID:
    //   return 'ropsten.'
    // case networkEnums.RINKEBY_NETWORK_ID:
    //   return 'rinkeby.'
    // case networkEnums.KOVAN_NETWORK_ID:
    //   return 'kovan.'
    // case networkEnums.GOERLI_NETWORK_ID:
    //   return 'goerli.'
    case networkEnums.MAINNET_NETWORK_ID:
      return ''
    case networkEnums.TESTNET_NETWORK_ID:
      return 'testnet.'
    default: // also covers mainnet
      return ''
  }
}
