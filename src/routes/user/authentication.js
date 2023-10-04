const {Router} = require('express')
const authentication = require('../../controllers/user/authentication')
const { verifyRefreshToken } = require('../../middlewares/verifyToken')
const router = Router()

router.use('/login',authentication.login)
router.use('/verify',authentication.verify)
router.use('/refresh',verifyRefreshToken,authentication.refresh)


module.exports = router
