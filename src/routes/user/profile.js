const {Router} = require('express')
const profile = require('../../controllers/user/profile')
const upload = require('../../middlewares/upload')
const router = Router()

router.get('/profile',profile.getProfile)
router.post('/profile',upload.single('image'),profile.updateProfile)

module.exports = router