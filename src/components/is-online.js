'use strict'

module.exports = function isOnline (self) {
  return () => {
    return Boolean(self._libp2pNode && self._libp2pNode.isStarted())
  }
}