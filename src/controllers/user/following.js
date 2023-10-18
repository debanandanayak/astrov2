const Following = require("../../services/User/Following")
const ApiError = require("../../utils/ApiError")
const asyncHandler = require("../../utils/asyncHandler")

async function createFollowing(req, res) {
  const astrologerId = +req.query.id
  const id = req.id
  const following = await Following.createFollowing(id, astrologerId)
  res.json({ following: following.followings })
}
async function getFollowing(req, res) {
  const { limit, page } = req.query
  const id = req.id
  const following = await Following.getFollowing(+id, +limit, +page)
  console.log(following)
  res.json({ following: following[0]?.followings })
}

async function removeFollowing(req, res) {
  const id = req.id
  const astrologerId = +req.query.id
  const removedFollowing = await Following.removeFollowing(id, astrologerId)
  console.log(removedFollowing)
  res.json({
    message: "following removed",
    followings: removedFollowing.followings,
  })
}
module.exports = {
  createFollowing: asyncHandler(createFollowing),
  getFollowing: asyncHandler(getFollowing),
  removeFollowing: asyncHandler(removeFollowing),
}
