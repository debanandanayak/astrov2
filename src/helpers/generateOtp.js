function generateOtp() {
  const number = "0123456789"
  let otp = ""
  for (let i = 0; i < 4; i++) {
    otp = otp + number[Math.floor(Math.random() * number.length)]
  }
  if(otp[0]==='0') otp = otp+'5'
  return +otp
}

module.exports = generateOtp