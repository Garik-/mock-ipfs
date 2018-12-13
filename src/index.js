'use strict'
const PeerBook = require('peer-book')
const debug = require('debug')
const EventEmitter = require('events')
const components = require('./components')
const boot = require('./boot')

// const defaultRepo = require('./runtime/repo-nodejs')

class MockIPFS extends EventEmitter {
    constructor (multiaddrs, libp2pOptions) {
        super()

        // IPFS utils
        this.log = debug('djan-ipfs')
        this.log.err = debug('djan-ipfs:err')
        this._options = libp2pOptions
        this._multiaddrs = multiaddrs

        this._peerInfoBook = new PeerBook()
        this._peerInfo = undefined
        this._libp2pNode = undefined
        this._print = console.log

        this.libp2p = components.libp2p(this)
        this.pubsub = components.pubsub(this)
        this.start = components.start(this)
        this.stop = components.stop(this)
        this.id = components.id(this)
        this.isOnline = components.isOnline(this)
        this.swarm = components.swarm(this)

        if (this._options.config.EXPERIMENTAL.pubsub) {
            this.log('EXPERIMENTAL pubsub is enabled')
        }

        this.state = require('./state')(this)

        boot(this)
    }
}

exports = module.exports = MockIPFS
exports.createNode = (options) => {
  return new MockIPFS(options)
}

