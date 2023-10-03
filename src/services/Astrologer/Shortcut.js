const client = require("../../../database/client")
const ApiError = require("../../utils/ApiError")

class Shortcut {
  static async createShortcut(astrologerId, shortcut, message) {
    console.log(shortcut)
    const count = await client.shortcut.aggregate({
      _count: true,
      where: { astrologer_id: astrologerId },
    })
    console.log(count)
    if (count._count >= 15)
      throw new ApiError(402, {
        message: "Max limit reached for shortcut creation",
        total: count._count,
      })
    const shortcuts = await client.shortcut.upsert({
      create: {
        astrologer_id: astrologerId,
        shortcut: shortcut,
        message: message,
      },
      update: {
        message: message,
      },
      where: {
        astrologer_id_shortcut: {
          astrologer_id: astrologerId,
          shortcut: shortcut,
        },
      },
    })
    return shortcuts
  }

  static async deleteShortcut(astrologerId, shortcutId) {
    const data = await client.shortcut.deleteMany({
      where: {
        astrologer_id: astrologerId,
        ID: +shortcutId,
      },
    })
    return data
  }
  static async getShortcuts(astrologerId) {
    const shortcuts = await client.shortcut.findMany({
      where: {
        astrologer_id: +astrologerId,
      },
    })
    return shortcuts
  }
}
module.exports = Shortcut
