const client = require("../../../database/client")

class Profile {
  static async getProfile(id) {
    const user = await client.astrologer.findUnique({
      where: { ID: id },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        gender: true,
        image: true,
      },
    })
    return user
  }
  static async updateProfile(id, profile) {
    const {
      first_name,
      last_name,
      career_start,
      gender,
      short_bio,
      city,
      country,
    } = profile
    const updatedProfile = await client.astrologer.update({
      where: { ID: id },
      data: {
        first_name: first_name,
        last_name: last_name,
        career_start: career_start,
        gender: gender,
        short_bio: short_bio,
        city: city,
        country: country,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        gender: true,
      },
    })
    return updatedProfile
  }
  static async getAstrologers(){
    const astrologers = await client.astrologer.findMany({
      select: {
        ID: true,
        first_name:true,
        last_name:true,
        email:true,
        phone:true,
        image:true,
      }
    })
    return astrologers
  }
}

module.exports = Profile
