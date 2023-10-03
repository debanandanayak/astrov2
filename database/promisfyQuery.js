const conn = require('./config')
const util = require('node:util')
const promisifyQuery = util.promisify(conn.query).bind(conn)

module.exports = promisifyQuery
