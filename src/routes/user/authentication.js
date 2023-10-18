const {Router} = require('express')
const authentication = require('../../controllers/user/authentication')
const { verifyRefreshToken } = require('../../middlewares/verifyToken')
const router = Router()
const userValidation = require("../../validation/user/authentication")
const validate = require('../../validation/validate')

router.use('/login',userValidation.login,validate,authentication.login)
router.use('/verify',userValidation.verifyUser,authentication.verify)
router.use('/refresh',verifyRefreshToken,authentication.refresh)


module.exports = router
