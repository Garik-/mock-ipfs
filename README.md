# mock-ipfs
This is fork [js-ipfs](https://github.com/ipfs/js-ipfs/) without IPFS, only libp2p.  
Сreated to easy use [ipfs-pubsub-room](https://github.com/ipfs-shipyard/ipfs-pubsub-room) interface
## Use
```JS
const Room = require('ipfs-pubsub-room')
const IPFS = require('mock-ipfs')
const ipfs = new IPFS('/ip4/0.0.0.0/tcp/0', {
  config: {
      EXPERIMENTAL: {
        pubsub: true
      }
  }
})
// libp2p node is ready, so we can start using ipfs-pubsub-room
ipfs.on('ready', () => {
  const room = Room(ipfs, 'room-name')

  room.on('peer joined', (peer) => {
    console.log('Peer joined the room', peer)
  })

  room.on('peer left', (peer) => {
    console.log('Peer left...', peer)
  })

  // now started to listen to room
  room.on('subscribed', () => {
    console.log('Now connected!')
  })
})
```