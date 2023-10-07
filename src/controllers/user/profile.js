const Profile = require("../../services/User/Profile")
const asyncHandler = require("../../utils/asyncHandler")

async function getProfile(req,res){
    const id = req.id
    const profile = await Profile.getProfile(id)
    res.json({user:profile})
}
async function updateProfile(req, res){
    const id = req.id
//   const{ name, place_of_birth, date_of_birth, time_of_birth, gender} = req.body
  const user = await Profile.updateProfile(id,req.body)
  console.log(user);
  res.send({message:"User updated",user})
}
module.exports = {
    getProfile: asyncHandler(getProfile),
    updateProfile: asyncHandler(updateProfile),
}