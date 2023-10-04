const Following = require("../../services/User/Following")
const asyncHandler = require("../../utils/asyncHandler")

async function createFollowing(req,res){
    const astrologerId = req.query.id;
    const id = req.id
    const following = await Following.createFollowing(id,astrologerId)
    res.json({following:following.astrologer})

}
async function getFollowing(req,res){
    const {limit,page} = req.query;
    const id = req.id
    const following = await Following.getFollowing(id,limit,page)
    res.json({following:following})

}

module.exports = {
    createFollowing: asyncHandler(createFollowing),
    getFollowing: asyncHandler(getFollowing)
}