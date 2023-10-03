const {Router} = require('express')
const astrologer = Router()
const { verifyAccessToken } = require('../../middlewares/verifyToken')
const authentication = require('./authentication')
const profile = require('./profile')
const leave = require('./leave')
const shortcut = require('./shortcut')
const chat = require('./chat')
const blog = require('./blog')

astrologer.use('/',authentication)

astrologer.use(verifyAccessToken)
astrologer.use('/',profile)
astrologer.use('/',leave)
astrologer.use('/',shortcut)
astrologer.use('/',chat)
astrologer.use('/',blog)

module.exports = astrologer