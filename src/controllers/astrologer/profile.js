const Profile = require("../../services/Astrologer/Profile")
const asyncHandler = require("../../utils/asyncHandler")

async function profile(req,res){
    const id = req.id
    const profile = await Profile.getProfile(id)
    console.log(profile);
    res.status(200).json(profile)
}

async function update(req,res){
    const profileData = req.body
    const id = req.id
    // const {
    //     first_name,
    //     last_name,
    //     career_start,
    //     gender,
    //     short_bio,
    //     city,
    //     country,
    //     image
    //   } = profile
    profileData.image = req.file?.filename
    const profile = await Profile.updateProfile(id,profileData)
    console.log(profile);
    res.status(200).json({message:"Profile updated",profile})
}


module.exports = {profile:asyncHandler(profile),update:asyncHandler(update)}