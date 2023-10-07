const Profile = require("../../services/Astrologer/Profile")
const asyncHandler = require("../../utils/asyncHandler")

async function getAstrologers(req, res) {
  const astrologers = await Profile.getAstrologers()
  res.json({ astrologers })
}

module.exports = {
  getAstrologers: asyncHandler(getAstrologers),
}
