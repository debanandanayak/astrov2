const client = require("./database/client")
const moment = require("moment")
const Prokerela = require("./src/services/Prokerela")
const Blog = require("./src/services/Blog")
const { default: axios } = require("axios")
const Chat = require("./src/services/Chat/Chat")
const f = async () => {
  try {
    const data = await Chat.createConversation(10,15)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  
  // console.log(data)
}
f()
