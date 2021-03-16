import {
  MAINNET_CHAIN_ID,
  // ROPSTEN_CHAIN_ID,
  // RINKEBY_CHAIN_ID,
  // KOVAN_CHAIN_ID,
  // GOERLI_CHAIN_ID,
  MAINNET_CHAIN_NEW_ID,
  TESTNET_CHAIN_NEW_ID,
  TESTNET_CHAIN_ID
} from '../controllers/network/enums'

const standardNetworkId = {
  '1': MAINNET_CHAIN_ID,
  '3': TESTNET_CHAIN_ID,
  '888': MAINNET_CHAIN_NEW_ID,
  '999': TESTNET_CHAIN_NEW_ID,
  // '4': RINKEBY_CHAIN_ID,
  // '42': KOVAN_CHAIN_ID,
  // '5': GOERLI_CHAIN_ID,
}

export default function selectChainId (metamaskState) {
  const { network, provider: { chainId } } = metamaskState
  return standardNetworkId[network] || `0x${parseInt(chainId, 10).toString(16)}`
}
