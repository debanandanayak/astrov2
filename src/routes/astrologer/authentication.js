const {Router} = require('express')
const router = Router()
const authentication = require('../../controllers/astrologer/authentication')
const { verifyRefreshToken } = require('../../middlewares/verifyToken')

router.get('/', (req, res) => {
  res.send('Astrologer route')
})

router.post('/login', authentication.login)
router.post('/signup', authentication.signup)
router.get('/refresh',verifyRefreshToken, authentication.refresh)

module.exports = router