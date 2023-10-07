const client = require("../../../database/client")
const generateOtp = require("../../helpers/generateOtp")
const moment = require("moment")
class Authentication {
  static async login(phone) {
    let user = await client.user.upsert({
      where: {
        phone_number: phone,
      },
      create: {
        phone_number: phone,
        otp: generateOtp(),
        otp_expired_in: moment().add({ minute: 10 }),
      },
      update: {
        otp: generateOtp(),
        otp_expired_in: moment().add({ minute: 10 }),
      },include: {
        Wallet:true,
      }
    })
    // if(!user?.Wallet) {
    //   await client.wallet.create({
    //     data:{
    //       user_id:user.ID,
    //     }
    //   })
    // }

    return user
  }

  static async verifyOtp(phone, otp) {
    const user = await client.user.findFirst({
      where: {
        phone_number: phone,
        otp: otp,
        otp_expired_in: {
          gte: moment(),
        },
      },
    })
    return user
  }
}

module.exports = Authentication
