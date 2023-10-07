const {Router} = require('express')
const { getAstrologers } = require('../../controllers/public/astrologer')
const router = Router()
router.get('/astrologers',getAstrologers)


module.exports = router
