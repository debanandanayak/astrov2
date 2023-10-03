const jwt = require('jsonwebtoken')
class Token{
    static generateTokens(payload){
        const accessToken = jwt.sign(payload, 'ACCESS_SECRET');
        const refreshToken = jwt.sign(payload, 'REFRESH_SECRET');
        return {
            accessToken,
            refreshToken
        }
    }
    static verifyAccessToken(token){
        const data =  jwt.verify(token, 'ACCESS_SECRET');
        delete data.iat
        return data
    }
    static verifyRefreshToken(token){
        const data =  jwt.verify(token, 'REFRESH_SECRET');
        delete data.iat
        return data
    }
}

module.exports = Token