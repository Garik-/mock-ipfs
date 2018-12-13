'use strict'

const PeerInfo = require('peer-info')
const PeerId = require('peer-id')

const waterfall = require('async/waterfall')
// const RepoErrors = require('ipfs-repo').errors

// Boot an IPFS node depending on the options set

function createPeerInfo (callback) {
    waterfall([
      (cb) => PeerId.create({ bits: 512 }, cb),
      (peerId, cb) => PeerInfo.create(peerId, cb)
    ], callback)
  }

module.exports = (self) => {
  self.log('booting')
  // Do the actual boot sequence

  // first inicialize p
  waterfall([
    (cb) => createPeerInfo(cb),
    (peerInfo, cb) => {
        let multiaddrs = self._multiaddrs
        if (!Array.isArray(multiaddrs)) {
            multiaddrs = [multiaddrs]
        }
        multiaddrs.map((ma) => peerInfo.multiaddrs.add(ma))

        self._peerInfo = peerInfo
        self.state.initialized()
        cb()
    },
    (cb) => {
      self.start((err) => {
        if (err) return cb(Object.assign(err, { emitted: true }))
        cb()
      })
    }
  ], (err) => {
    if (err) {
      if (!err.emitted) {
        self.emit('error', err)
      }
      return
    }
    self.log('booted')
    self.emit('ready')
  })
}