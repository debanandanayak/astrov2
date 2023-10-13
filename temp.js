const client = require("./database/client")
const moment = require("moment")
const Prokerela = require("./src/services/Prokerela")
const Blog = require("./src/services/Blog")
const { default: axios } = require("axios")
const Chat = require("./src/services/Chat/Chat")
const f = async () => {
  try {
    const price = await client.rate.findFirst({
      where:{
        astrologer_id:14
      }
    })
  const maxChatTime = 100/10
console.log(price)
  } catch (error) {
    console.log(error.message)
  }
  
}
f()

// SELECT session_start, session_end,time_to_sec(timediff(session_end,session_start)) /60 AS duration FROM chatsession;
// timediff(session_end,session_start)