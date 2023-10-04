const {Router} = require('express')
const profile = require('../../controllers/user/profile')
const router = Router()

router.get('/profile',profile.getProfile)
router.post('/profile',profile.updateProfile)

module.exports = router