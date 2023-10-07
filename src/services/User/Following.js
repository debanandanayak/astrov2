const client = require("../../../database/client")
const ApiError = require("../../utils/ApiError")

class Following {
  static async createFollowing(userId, astrologerId) {
    let following = await client.user.update({
      where: {
        ID: +userId,
      },
      data: {
        followings: {
          connect: {
            ID: +astrologerId,
          },
        },
      },
      select: {
        followings: {
          select: {
            ID: true,
            first_name: true,
            last_name: true,
            image: true,
          },
        },
      },
    })
    return following
  }
  static async getFollowing(userId, limit = 20, page = 1) {
    const followings = await client.user.findMany({
      where: { ID: userId },
      select: {
        followings: {
          select: {
            ID: true,
            first_name: true,
            last_name: true,
            image: true,
            gender: true,
          },
        },
      },
    })

    return followings
  }

  static async removeFollowing(id, astrologerId) {
    const removedFollowing = await client.user.update({
      where: { ID: id },
      data: {
        followings: {
          disconnect: {
            ID: astrologerId,
          },
        },
      },
      select: {
        followings: {
          select: {
            ID: true,
            first_name: true,
            last_name: true,
            image: true,
            gender: true,
          },
        },
      },
    })
    return removedFollowing
  }
}

module.exports = Following
