const Role = require("../../constants").Role
const Authentication = require("../../services/Astrologer/Authentication")
const Token = require("../../services/Token")
const asyncHandler = require("../../utils/asyncHandler")

const login = async function(req,res){
    const {email,password} = req.body
    const user = await Authentication.login(email,password)
    const tokens = Token.generateTokens({ email: email, id: user.ID,role:Role.ASTROLOGER})
    res.status(200).json(tokens)
}

const signup = async function (req,res){
    const {first_name, last_name, email, phone, password, gender} = req.body
    const user = await Authentication.signup(first_name,last_name,email,phone,password,gender)
    res.status(201).json({message:'signup successful',user})
}

const refresh = function (req,res){
    const payload = req.payload
    const tokens = Token.generateTokens(payload)
    res.status(200).json({...tokens})

}

module.exports={login:asyncHandler(login),signup:asyncHandler(signup),refresh}