'use strict'

const raw = require('./data.json')

module.exports = raw.map(([id, name]) => ({id, name}))
