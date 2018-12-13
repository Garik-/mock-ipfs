'use strict'

const promisify = require('promisify-es6')
const setImmediate = require('async/setImmediate')
// const pkgversion = require('../../../package.json').version

module.exports = function id (self) {
  return promisify((opts, callback) => {
    if (typeof opts === 'function') {
      callback = opts
      opts = {}
    }

    setImmediate(() => callback(null, {
      id: self._peerInfo.id.toB58String(),
      publicKey: self._peerInfo.id.pubKey.bytes.toString('base64')
    }))
  })
}