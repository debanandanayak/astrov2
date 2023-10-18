const client = require("../../../database/client")
const ApiError = require("../../utils/ApiError")

class Following {
  static async createFollowing(userId, astrologerId) {
    try {
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
    } catch (error) {
      throw new ApiError(400,"Astrologer doesn't exist",null,error)
    }
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
    try {
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
    } catch (error) {
      throw new ApiError(400,'Invalid astrologer Id',null,error)
    }
  }
}

module.exports = Following
