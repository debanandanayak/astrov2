const {Router} = require('express')
const support = require('../../controllers/user/support')
const router = Router()
const upload =require('../../middlewares/upload')

router.post('/support',upload.single("image"),support.createSupport)
router.get('/support/:phone_number',support.getSupport)
router.delete('/support/:id',support.deleteSupport)
module.exports = router