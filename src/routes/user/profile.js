const {Router} = require('express')
const profile = require('../../controllers/user/profile')
const upload = require('../../middlewares/upload')
const validate = require('../../validation/validate')
const { sanitizeTimeStamp } = require('../../validation/user/profile')
const router = Router()

router.get('/profile',profile.getProfile)
router.post('/profile',sanitizeTimeStamp('date_of_birth'),validate,upload.single('image'),profile.updateProfile)

module.exports = router