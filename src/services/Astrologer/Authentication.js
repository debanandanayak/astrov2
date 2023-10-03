const ApiError = require("../../utils/ApiError")
const bcrypt = require('bcrypt')
const client = require("../../../database/client")
class Authentication {
  static async login(email, password) {
    const user = await client.astrologer.findFirst({
      where: { email: email },
    })
    if (!user) throw new ApiError(409, "User does not exist")
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new ApiError(400, "Wrong user name or password")
    return user
  }
  static async signup(first_name, last_name, email, phone, password, gender) {
    const user = await client.astrologer.findFirst({
      where: {
        OR:[
            { email: email },
            {phone:phone}
        ]
      },
    })
    if (user) throw new ApiError(409, "User already exists")
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await client.astrologer.create({
      data: {
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: hashedPassword,
        phone: phone,
        gender: gender,
      },
    })
    return newUser
  }
}

module.exports = Authentication