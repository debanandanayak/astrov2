const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
const REFRESH_SECRET = process.env.REFRESH_SECRET
const EXPIRES_IN = process.env.ACCESS_EXPIRES_IN
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN
class Token{
    static generateTokens(payload,accessExpiresIn=EXPIRES_IN,refreshExpiresIn=REFRESH_EXPIRES_IN){
        const accessToken = jwt.sign(payload, SECRET,{expiresIn:accessExpiresIn});
        const refreshToken = jwt.sign(payload, REFRESH_SECRET,{expiresIn:refreshExpiresIn});
        return {
            accessToken,
            refreshToken
        }
    }
    static verifyAccessToken(token){
        const data =  jwt.verify(token, SECRET);
        delete data.iat
        return data
    }
    static verifyRefreshToken(token){
        const data =  jwt.verify(token, REFRESH_SECRET);
        delete data.iat
        return data
    }

    static decodeAccessToken(token){
        const data = jwt.decode(token,SECRET)
        return data
    }
}

module.exports = Token