const {Router} = require('express')
const { getAstrologers,getAstrologerById, getAstrologerType, getAstrologerByType } = require('../../controllers/public/astrologer')
const router = Router()
router.get('/astrologer',getAstrologers)
router.get('/astrologer/category/:type',getAstrologerByType)
router.get('/astrologer/:id',getAstrologerById)



module.exports = router
