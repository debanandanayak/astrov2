const {Router} = require('express')
const router = Router()
const {profile, update} = require('../../controllers/astrologer/profile')
const upload = require('../../middlewares/upload')

router.get('/profile',profile)
router.post('/profile',upload.single('image'),update)

module.exports = router