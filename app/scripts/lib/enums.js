const ENVIRONMENT_TYPE_POPUP = 'popup'
const ENVIRONMENT_TYPE_NOTIFICATION = 'notification'
const ENVIRONMENT_TYPE_FULLSCREEN = 'fullscreen'
const ENVIRONMENT_TYPE_BACKGROUND = 'background'

const PLATFORM_BRAVE = 'Brave'
const PLATFORM_CHROME = 'Chrome'
const PLATFORM_EDGE = 'Edge'
const PLATFORM_FIREFOX = 'Firefox'
const PLATFORM_OPERA = 'Opera'

const MESSAGE_TYPE = {
  ETH_DECRYPT: 'eth_decrypt',
  ETH_GET_ENCRYPTION_PUBLIC_KEY: 'eth_getEncryptionPublicKey',
  ETH_SIGN: 'eth_sign',
  ETH_SIGN_TYPED_DATA: 'eth_signTypedData',
  PERSONAL_SIGN: 'personal_sign',

  GET_PROVIDER_STATE: 'metamask_getProviderState',
  LOG_WEB3_SHIM_USAGE: 'metamask_logWeb3ShimUsage',
  WATCH_ASSET: 'wallet_watchAsset',
  WATCH_ASSET_LEGACY: 'metamask_watchAsset',
  ADD_ETHEREUM_CHAIN: 'wallet_addEthereumChain',
  SWITCH_ETHEREUM_CHAIN: 'wallet_switchEthereumChain',
}

export {
  ENVIRONMENT_TYPE_POPUP,
  ENVIRONMENT_TYPE_NOTIFICATION,
  ENVIRONMENT_TYPE_FULLSCREEN,
  ENVIRONMENT_TYPE_BACKGROUND,
  MESSAGE_TYPE,
  PLATFORM_BRAVE,
  PLATFORM_CHROME,
  PLATFORM_EDGE,
  PLATFORM_FIREFOX,
  PLATFORM_OPERA,
}
