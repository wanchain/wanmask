/**
 * Gives the caller a url at which the user can acquire eth, depending on the network they are in
 *
 * @param {Object} opts - Options required to determine the correct url
 * @param {string} opts.network The network for which to return a url
 * @param {string} opts.address The address the bought WAN should be sent to.  Only relevant if network === '1'.
 * @returns {string|undefined} - The url at which the user can access WAN, while in the given network. If the passed
 * network does not match any of the specified cases, or if no network is given, returns undefined.
 *
 */
export default function getBuyEthUrl ({ network, address, service }) {
  // default service by network if not specified
  if (!service) {
    service = getDefaultServiceForNetwork(network)
  }

  switch (service) {
    case 'binance':
      return `https://www.binance.com/`
    case 'testnet-faucet':
      return `https://wanchain-faucet.vercel.app/`
    default:
      throw new Error(`Unknown cryptocurrency exchange or faucet: "${service}"`)
  }
}

function getDefaultServiceForNetwork (network) {
  switch (network) {
    case '1':
      return 'binance'
    case '3':
      return 'testnet-faucet'
    default:
      throw new Error(`No default cryptocurrency exchange or faucet for networkId: "${network}"`)
  }
}
