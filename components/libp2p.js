'use strict'

const promisify = require('promisify-es6')
const get = require('lodash/get')
const defaultsDeep = require('@nodeutils/defaults-deep')
// const ipnsUtils = require('../ipns/routing/utils')
const createNode = require('../utils/create-node')

module.exports = function libp2p (self) {
  return {
    start: promisify((callback) => {
      createNode({
        peerBook: self._peerInfoBook,
        peerInfo: self._peerInfo,
        config: {
          EXPERIMENTAL: {
            pubsub: true
          }
        }
      }, (err, node) => {
        if (err) { return callback(err) }
        self._libp2pNode = node
        self._libp2pNode.on('peer:discovery', (peerInfo) => {
          const dial = () => {
            self._peerInfoBook.put(peerInfo)
            self._libp2pNode.dial(peerInfo, () => {})
          }
          if (self.isOnline()) {
            dial()
          } else {
            self._libp2pNode.once('start', dial)
          }
        })

        self._libp2pNode.on('peer:connect', (peerInfo) => {
          self._peerInfoBook.put(peerInfo)
        })

        self._libp2pNode.start((err) => {
          if (err) { return callback(err) }

          self._libp2pNode.peerInfo.multiaddrs.forEach((ma) => {
            self._print('Swarm listening on', ma.toString())
          })

          callback()
        })
      })
    }),
    stop: promisify((callback) => {
      self._libp2pNode.stop(callback)
    })
  }
}