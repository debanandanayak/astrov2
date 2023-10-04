function generateOtp() {
  const number = "0123456789"
  let otp = ""
  for (let i = 0; i < 4; i++) {
    otp = otp + number[Math.floor(Math.random() * number.length)]
  }
  console.log(otp)
  return +otp
}

module.exports = generateOtp