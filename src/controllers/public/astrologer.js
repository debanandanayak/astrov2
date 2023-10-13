const Profile = require("../../services/Astrologer/Profile")
const ApiError = require("../../utils/ApiError")
const asyncHandler = require("../../utils/asyncHandler")

async function getAstrologers(req, res) {
  const type = req.query.type
  const astrologers = await Profile.getAstrologers()
  res.json({ astrologers })
}
async function getAstrologerById(req,res){
  const id = +req.params.id
  if(isNaN(id)) throw new ApiError(404,"Not found")
  const astrologer = await Profile.getProfile(id)
  res.json({ astrologer })
}


async function getAstrologerByType(req,res){
  const type = req.params.type
  const astrologers = await Profile.getAstrologersByTypes(type)
  res.json({ astrologers })
}
module.exports = {
  getAstrologers: asyncHandler(getAstrologers),
  getAstrologerById:asyncHandler(getAstrologerById),
  getAstrologerByType:asyncHandler(getAstrologerByType)
}
