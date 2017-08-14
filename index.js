'use strict'

const data = require('./data.json')

module.exports = data.map(([id, name]) => {id, name})
