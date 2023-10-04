const client = require("../../../database/client")
const ApiError = require("../../utils/ApiError")

class Following {
  static async createFollowing(userId, astrologerId) {
    let following = await client.userAstrologer.upsert({
      where: {
        user_id_astrologer_id:{
            astrologer_id: +astrologerId,
            user_id: +userId
        }
      },update: {
        astrologer_id: +astrologerId,
        user_id: +userId
      },create:{
        astrologer_id: +astrologerId,
        user_id: +userId
      },select:{
        astrologer: {
            select:{
                ID: true,
                first_name: true,
                last_name:true,
                image:true,
            }
        },
      }
    })
    return following
  }
  static async getFollowing(userId){
    const followings = await client.user.findMany({where: {ID: userId},include: {
        followings:{
            select:{
                first_name:true,
                last_name:true,
                image:true,
                ID:true,
                gender:true
            }
        },
    }})

    return followings
  }
}

module.exports = Following
