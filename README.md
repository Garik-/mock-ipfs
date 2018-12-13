# mock-ipfs
Сreated to use the library [ipfs-pubsub-room](https://github.com/ipfs-shipyard/ipfs-pubsub-room)
```JS
const IPFS = require('mock-ipfs')
const swarms = '/ip4/0.0.0.0/tcp/0'
const ipfsOptions = {
  config: {
      EXPERIMENTAL: {
        pubsub: true
      }
  }
}
const node = new IPFS(swarms, ipfsOptions)
```