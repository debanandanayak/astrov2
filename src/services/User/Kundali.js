const client = require("../../../database/client")

class Kundali {
  static async createKundali(userId, details) {
    const kundali = await client.kundali.create({
      data: {
        name: details.name,
        date_of_birth: details.date_of_birth,
        coordinate: details.coordinate,
        place_of_birth: details.place_of_birth,
        type: details.type,
        user_id: userId,
      },
    })
    return kundali
  }
  static async getKundali(userId) {
    const kundali = await client.kundali.findMany({
      where: {
        user_id: userId,
      },
    })
    return kundali
  }
  static async deleteKundali(userId,ids){
    const kundali = await client.kundali.deleteMany({
      where:{
        user_id: userId,
        ID:{
          in:ids
        }
      }
    })
    return kundali
  }
}

module.exports = Kundali