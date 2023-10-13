const Profile = require("../../services/User/Profile")
const asyncHandler = require("../../utils/asyncHandler")

async function getProfile(req,res){
    const id = req.id
    const profile = await Profile.getProfile(id)
    res.json({user:profile})
}
async function updateProfile(req, res){
    const id = req.id
    req.body.image = req.file?.filename
    console.log(req.file);
  const user = await Profile.updateProfile(id,req.body)
  console.log(user);
  res.send({message:"User updated",user})
}
module.exports = {
    getProfile: asyncHandler(getProfile),
    updateProfile: asyncHandler(updateProfile),
}