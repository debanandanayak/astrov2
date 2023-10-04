const {Router} = require('express')
const userRouter = Router()
const {verifyAccessToken} = require('../../middlewares/verifyToken')
const authentication = require('./authentication')
const profile = require('./profile')
const following = require('./following')

userRouter.use('/',authentication)
userRouter.use(verifyAccessToken)
userRouter.use('/',profile)
userRouter.use('/',following)

module.exports = userRouter