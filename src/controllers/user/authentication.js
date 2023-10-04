const Role = require("../../constants")
const Token = require("../../services/Token")
const Authentication = require("../../services/User/Authentication")
const asyncHandler = require("../../utils/asyncHandler")

async function login(req, res) {
  const { phone_number } = req.body
  const user = await Authentication.login(phone_number)
  return res.status(200).json({ message: 'OTP sent successfully', otp:user.otp, success: true });
}

async function verifyUser(req, res) {
    const { phone_number, otp } = req.body;


    const otpInt = parseInt(otp, 10)
    try {
      const user = await Authentication.verifyOtp(phone_number, otpInt)

      if (!user) {
        return res.status(400).json({ message: 'Invalid otp' })
      }
      const {accessToken, refreshToken} = Token.generateTokens({ phone_number: user.phone_number, id: user.ID,role:Role.USER })
      res.status(200).json({ message: 'Login successful', accessToken, refreshToken })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' })
    }
  }
async function refresh(req,res){
    const payload = req.payload
    const tokens = Token.generateTokens(payload)
    res.status(200).json({...tokens})
}
module.exports = {
    login:asyncHandler(login),
    verify:asyncHandler(verifyUser),
    refresh:asyncHandler(refresh)
}