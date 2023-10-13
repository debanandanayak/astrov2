const {Router} = require('express')
const { language, category } = require('../../controllers/global')

const router = Router()

router.get('/language',language)
router.get('/category',category)

module.exports = router