var crypto = self.crypto || self.msCrypto

/*
 * This alphabet uses a-z A-Z 0-9 _- symbols.
 * Symbols order was changed for better gzip compression.
 */
var url = 'IUint8Ar21ModulvezGFYPCJ7_p0V4XSymbLBNH6fTqQ35xD9ZREghasOw-cjkWK'

module.exports = function (size) {
  size = size || 21
  var id = ''
  var bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    // 1. 63 means last 6 bits
    // 2. there is no need in `|| ''` and `* 1.6` hacks in here,
    // because there's 64 symbols in the default alphabet.
    // 64 is Math.pow(2, 6), the bitmask works perfectly
    // without any bytes bigger than the alphabet
    id += url[bytes[size] & 63]
  }
  return Promise.resolve(id)
}
