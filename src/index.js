require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http");
const path =require('path')
const fs =require('fs')
const { Server } = require("socket.io")
const astrologer = require("./routes/astrologer/index")
const errorHandler = require("./middlewares/errorHandler")
const userRouter = require("./routes/user")
const publicRouter = require("./routes/public/index")
const global = require('./routes/global/index')
const verifySocketUser = require("./middlewares/verifySocketUser")
const Chat = require("./services/Chat/Chat")
const { onCapturePayment } = require("./controllers/payment")
const Token = require("./services/Token")
const client = require("../database/client")

app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(cors())
app.use("/public", publicRouter)
app.use("/astrologer", astrologer)
app.use("/user", userRouter)
app.get("/health", (req, res) => {
  res.send("OK")
})
app.use('/',global)

app.get("/capture", onCapturePayment)
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
})

app.get("/image/:name",async(req,res) =>{
  const name = req.params.name
  console.log(name)
  try{
    const imagePath = path.join(__dirname,`../public/images/${name}`)
    fs.accessSync(imagePath)
    res.sendFile(imagePath)
  }catch(error){
    res.status(404).json({ message: "No such file found" });
  }
})



const session = {}
io.use(verifySocketUser)

io.on("connection", socket => {
  console.log("user", socket.room, "connected ")
  const key = socket.room
  socket.join(key)
  session[key] = { socket }
  socket.on("request-session", ({ id }) => {
    let receiver = socket.user.role === "user" ? "astrologer" : "user"
    receiver = receiver + "-" + id
    if (!session[receiver]) {
      socket.send("astrologer unavailable")
      return
    }
    if(session[receiver].socket.handshake.headers.access){
      console.log('busy',session[receiver].socket.handshake.headers.access);
      socket.send(receiver,'is busy')
      return
    }
    session[receiver].socket.emit("accept-session", { id: socket.user.id })
  })

  socket.on("accept-session", async ({ id }) => {
    let receiver = socket.user.role === "user" ? "astrologer" : "user"
    receiver = receiver + "-" + id
    if (!session[receiver]) {
      socket.send(`${receiver} unavailable`)
      return
    }
    if(session[receiver].socket.handshake.headers.access){
      console.log('busy',session[receiver].socket.handshake.headers.access);
      socket.send(receiver,'is busy')
      return
    }
    console.log(receiver)
    const details = await Chat.createConversation(id, socket.user.id)
    const chatSession = await client.chatSession.create({
      data:{
        conversation_id:details.ID
      }
    })
    const room = `private-${details.ID}`
    const price = await client.rate.findUnique({

    })
    const access = Token.generateTokens({
      ...details,
      room,
      chatSession,
      limit: 5,
    },'2m').accessToken
    console.log(access);
    session[receiver].socket.join(room)
    socket.join(room)

    socket.handshake.headers.access = access
    session[receiver].socket.handshake.headers.access = access

    socket.emit("accept-session", { status: "OK" })
    session[receiver].socket.emit("accept-session", { status: "OK" })
  })

  
  socket.on("message", message => {
    try {  
      const token = Token.verifyAccessToken(socket.handshake.headers.access)
      Chat.sendMessage(socket.user.role,token.ID,socket.user.id,message)
      socket.broadcast.to(token.room).emit("message", message)
    } catch (error) {
      console.log(error)
      socket.send("invalid token")
      socket.disconnect()
    }
  })

  socket.on("disconnect", async (reason) => {
    console.log(reason);
    console.log("user", socket.room, "disconnected ")
    try {
      const data = Token.decodeAccessToken(socket.handshake.headers.access)
      console.log(data);
      let endTime = Date.now()
      if(endTime>data.exp*1000){
        endTime = new Date(data.exp*1000).getTime()
      }
      endTime = new Date(endTime).toISOString()
      const sessionDetails = await client.chatSession.update({
        where: {
          ID: data.chatSession.ID,
        },data: {
          session_end: endTime,
        }
      })
      console.log(sessionDetails)
      session[`astrologer-${data.astrologer_id}`].socket.handshake.headers.access = null
      session[`user-${data.user_id}`].socket.handshake.headers.access = null
      delete session[socket.room]
    } catch (err) {
      console.log(err)

    }
  })
})
server.listen(3000, () => {
  console.log("App listening on port 3000!")
})

app.use(errorHandler)
