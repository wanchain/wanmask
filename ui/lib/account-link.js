export default function getAccountLink (address, network, rpcPrefs) {
  if (rpcPrefs && rpcPrefs.blockExplorerUrl) {
    return `${rpcPrefs.blockExplorerUrl.replace(/\/+$/, '')}/address/${address}`
  }

  const net = parseInt(network)
  let link
  switch (net) {
    // case 1: // main net
    //   link = `https://wanscan.org/address/${address}`
    //   break
    // case 2: // morden test net
    //   link = `https://morden.wanscan.org/address/${address}`
    //   break
    // case 3: // ropsten test net
    //   link = `https://ropsten.wanscan.org/address/${address}`
    //   break
    // case 4: // rinkeby test net
    //   link = `https://rinkeby.wanscan.org/address/${address}`
    //   break
    // case 42: // kovan test net
    //   link = `https://kovan.wanscan.org/address/${address}`
    //   break
    // case 5: // goerli test net
    //   link = `https://goerli.wanscan.org/address/${address}`
    //   break
    case 1: // main net
      link = `https://wanscan.org/address/${address}`
      break
    case 3: // wanchain testnet
      link = `https://testnet.wanscan.org/address/${address}`
      break
    default:
      link = ''
      break
  }

  return link
}
