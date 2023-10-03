const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError")
const Token = require("../services/Token")
const verifyAccessToken = (req,res,next)=>{
    try{
        let token = req.headers.authorization;
        console.log(token);
        if(!token) throw new ApiError(401,'Unauthorized user | Missing token')
        token = token.split(" ")[1];
        let data = Token.verifyAccessToken(token)
        req.astrologerId = data.id;
        req.id = data.id;
        req.email = data.email;
        req.role = data.role
        console.log(data);
        console.log(`User role ${data.role} ID - ${data.id}`)
        next()
    }catch(error){
        console.log(error);
        throw new ApiError(401,'Unauthorized user')
    }
}

const verifyRefreshToken = (req,res,next)=>{
    try{
        let token = req.headers.authorization;
        if(!token) throw new ApiError(401,'Unauthorized user | Missing token')
        token = token.split(" ")[1];
        let data = Token.verifyRefreshToken(token)
        console.log(`User role ${data.role} ID - ${data.id}`)
        req.payload = data
        next()
    }catch(error){
        console.log(error);
        throw new ApiError(401,'Unauthorized user')
    }
}

module.exports = {verifyAccessToken,verifyRefreshToken};