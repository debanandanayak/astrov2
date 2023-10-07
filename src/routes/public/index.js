const {Router} = require('express')
const router = Router()
const astrologer = require('./astrologer')
router.use('/',astrologer)


module.exports = router
