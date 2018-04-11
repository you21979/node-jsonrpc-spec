const util = require('..').util2

console.log(util.autoDetect({ jsonrpc:"2.0", method: "test", id: 0, params:[] }))
console.log(util.autoDetect({ jsonrpc:"2.0", method: "test", id: 0 }))
console.log(util.autoDetect({ jsonrpc:"2.0", method: "test" }))
console.log(util.autoDetect({ jsonrpc:"2.0", result: 0, id: 0 }))
