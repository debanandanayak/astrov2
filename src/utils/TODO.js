const ApiError = require("./ApiError")

function TODO(message){
    throw new ApiError(501,message || "Not implemented")
}

module.exports = TODO