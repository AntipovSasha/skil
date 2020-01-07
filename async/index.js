var random = require('./random')
var url = require('../url')

/**
 * Generate secure URL-friendly unique ID. Non-blocking version.
 *
 * By default, ID will have 21 symbols to have a collision probability similar
 * to UUID v4.
 *
 * @param {number} [size=21] The number of symbols in ID.
 *
 * @return {Promise} Promise with random string.
 *
 * @example
 * const nanoidAsync = require('nanoid/async')
 * nanoidAsync.then(id => {
 *   model.id = id
 * })
 *
 * @name async
 * @function
 */
module.exports = function (size) {
  size = size || 21
  return random(size).then(function (bytes) {
    var id = ''
    while (size--) {
      // 1. 63 means last 6 bits
      // 2. there is no need in `|| ''` and `* 1.6` hacks in here,
      // because there's 64 symbols in the default alphabet.
      // 64 is Math.pow(2, 6), the bitmask works perfectly
      // without any bytes bigger than the alphabet
      id += url[bytes[size] & 63]
    }
    return id
  })
}
