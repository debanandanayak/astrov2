const client = require("../../../database/client")

class Profile {
  static async getProfile(id) {
    const user = await client.astrologer.findUnique({
      where: { ID: id },
      select: {
        ID: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        gender: true,
        image: true,
        astrologer_types: {
          select: {
            ID: true,
            type: true,
          },
        },
        languages: true,
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
      image
    } = profile
    let isoDate
    if(career_start) isoDate = new Date(career_start).toISOString()
    const updatedProfile = await client.astrologer.update({
      where: { ID: id },
      data: {
        first_name: first_name,
        last_name: last_name,
        career_start: isoDate,
        gender: gender,
        short_bio: short_bio,
        city: city,
        country: country,
        image: image
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        gender: true,
        image:true,
        career_start:true
      },
    })
    return updatedProfile
  }
  static async getAstrologers() {
    const astrologers = await client.astrologer.findMany({
      select: {
        ID: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        gender: true,
        image: true,
        astrologer_types: {
          select: {
            ID: true,
            type: true,
          },
        },
        languages: true,
      },
    })
    return astrologers
  }


  static async getAstrologersByTypes(type='medical') {
    const astrologers = await client.astrologer.findMany({
      where:{
        astrologer_types: {
          some:{
            type:{
              contains: type
            }
          }
        }
      },select:{
        ID: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        gender: true,
        image: true,
        astrologer_types: {
          select: {
            ID: true,
            type: true,
          },
        },
        languages: true,
      },
    })
    return astrologers
  }
}

module.exports = Profile
