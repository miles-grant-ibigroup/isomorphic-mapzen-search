
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./isomorphic-mapzen-search.cjs.production.min.js')
} else {
  module.exports = require('./isomorphic-mapzen-search.cjs.development.js')
}
