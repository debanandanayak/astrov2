const {Router} = require('express')
const router = Router()
const {profile, update} = require('../../controllers/astrologer/profile')

router.get('/profile',profile)
router.post('/profile',update)

module.exports = router