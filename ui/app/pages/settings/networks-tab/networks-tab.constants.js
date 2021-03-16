
import {MAINNET, TESTNET, MAINNETCHINA} from '../../../../../app/scripts/controllers/network/enums'
const defaultNetworksData = [
  {
    labelKey: 'mainnet',
    iconColor: '#29B6AF',
    providerType: MAINNET,
    rpcUrl: 'https://gwan-ssl.wandevs.org:56891',
    chainId: '888',
    ticker: 'WAN',
    blockExplorerUrl: 'https://www.wanscan.org',
  },
  {
    labelKey: 'mainnetChina',
    iconColor: '#29B6AF',
    providerType: MAINNETCHINA,
    rpcUrl: 'http://54.223.100.92:26891',
    chainId: '888',
    ticker: 'WAN',
    blockExplorerUrl: 'https://www.wanscan.org',
  },
  {
    labelKey: 'testnet',
    iconColor: '#FF4A8D',
    providerType: TESTNET,
    rpcUrl: 'https://gwan-ssl.wandevs.org:46891',
    // rpcUrl: 'https://demodex.wandevs.org:48545',
    chainId: '999',
    ticker: 'WAN',
    blockExplorerUrl: 'https://testnet.wanscan.org',
  },
  // {
  //   labelKey: 'rinkeby',
  //   iconColor: '#F6C343',
  //   providerType: 'rinkeby',
  //   rpcUrl: 'https://api.infura.io/v1/jsonrpc/rinkeby',
  //   chainId: '4',
  //   ticker: 'WAN',
  //   blockExplorerUrl: 'https://rinkeby.wanscan.org',
  // },
  // {
  //   labelKey: 'goerli',
  //   iconColor: '#3099f2',
  //   providerType: 'goerli',
  //   rpcUrl: 'https://api.infura.io/v1/jsonrpc/goerli',
  //   chainId: '5',
  //   ticker: 'WAN',
  //   blockExplorerUrl: 'https://goerli.wanscan.org',
  // },
  // {
  //   labelKey: 'kovan',
  //   iconColor: '#9064FF',
  //   providerType: 'kovan',
  //   rpcUrl: 'https://api.infura.io/v1/jsonrpc/kovan',
  //   chainId: '42',
  //   ticker: 'WAN',
  //   blockExplorerUrl: 'https://wanscan.org',
  // },
  {
    labelKey: 'localhost',
    iconColor: 'white',
    border: '1px solid #6A737D',
    providerType: 'localhost',
    rpcUrl: 'http://localhost:8545/',
    blockExplorerUrl: 'https://www.wanscan.org',
  },
]

export {
  defaultNetworksData,
}
