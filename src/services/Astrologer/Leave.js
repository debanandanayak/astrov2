const client = require("../../../database/client")
const getPaginatedPayload = require("../../helpers/getPaginatedPayload")
const ApiError = require("../../utils/ApiError")
const moment = require('moment')

class Leave {
  static async getLeaves(id, page = 1, limit = 20) {
    const leaves = await client.leave.findMany({
      where: { astrologer_id: id },
      orderBy: {
        from_date: "desc",
      },
    })
    const data = getPaginatedPayload(leaves, page, limit)
    return data
  }
  static async createLeave(id, from_date, to_date, reason) {
    const fromDate = moment(from_date).toDate().toISOString()
    const toDate = moment(to_date).toDate().toISOString()
    if (from_date > to_date)
        throw new ApiError(409,"Not a valid interval")
    const overlappingLeaves = await client.leave.findMany({
      where: {
        astrologer_id: id,
        OR: [
          {
            AND: [
              { from_date: { lte: fromDate } },
              { to_date: { gte: fromDate } },
            ],
          },
          {
            AND: [{ from_date: { lte: toDate } }, { to_date: { gte: toDate } }],
          },
          {
            AND: [
              { from_date: { gte: fromDate } },
              { to_date: { lte: toDate } },
            ],
          },
        ],
      },
    })
    console.log("overlap leaves :", overlappingLeaves)
    if (overlappingLeaves.length > 0) {
        throw new ApiError(409,'Overlap leaves',{fromDate,toDate,overlapWith:overlappingLeaves})
    }
    const leaves = await client.leave.create({
      data: {
        astrologer_id: id,
        from_date: fromDate,
        to_date: toDate,
        reason: reason,
      },
      include: {
        Astrologer: {
          select: {
            leaves: true,
          },
        },
      },
    })
    console.log(leaves)
    return leaves
  }
}

module.exports = Leave
