const version = 3
const oldTestRpc = 'https://rawtestrpc.wanmask.io/'
const newTestRpc = 'https://testrpc.wanmask.io/'

import { cloneDeep } from 'lodash'

export default {
  version,

  migrate: function (originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData)
    versionedData.meta.version = version
    try {
      if (versionedData.data.config.provider.rpcTarget === oldTestRpc) {
        versionedData.data.config.provider.rpcTarget = newTestRpc
      }
    } catch (e) {}
    return Promise.resolve(versionedData)
  },
}
