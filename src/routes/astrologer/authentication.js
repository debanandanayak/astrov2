const {Router} = require('express')
const router = Router()
const authentication = require('../../controllers/astrologer/authentication')
const { verifyRefreshToken } = require('../../middlewares/verifyToken')
const astrologerValidation =require("../../validation/astrologer/authentication")


router.get('/', (req, res) => {
  res.send('Astrologer route')
})

router.post('/login',astrologerValidation.login, authentication.login)
router.post('/signup',astrologerValidation.signup, authentication.signup)
router.get('/refresh',verifyRefreshToken, authentication.refresh)

module.exports = router