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
const verifySocketUser = require("./middlewares/verifySocketUser")
const Chat = require("./services/Chat/Chat")
const { onCapturePayment } = require("./controllers/payment")
const Token = require("./services/Token")

app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(cors())
app.use("/public", publicRouter)
app.use("/astrologer", astrologer)
app.use("/user", userRouter)
app.get("/health", (req, res) => {
  res.send("OK")
})
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
// io.on("connection", socket => {
//   const key = socket.room
//   const room = socket.room
//   if (session[key]) {
//     socket.disconnect()
//   }
//   session[key] = { socket }
//   socket.join(room)
//   console.log(`User connected to room ${room}`)
//   socket.on("message", async data => {
//     const sender = socket.room
//     const message = {
//       message: data.message,
//       sender,
//     }
//     if(!data.room) return
//     try {
//       await Chat.sendMessage(socket.user.role, data.room, data.message)
//       let receiverRole = socket.user.role === "user" ? "astrologer" : "user"
//       const toRoom = `${receiverRole}-${data.receiver}`
//       console.log(`User ${sender} sent a message to ${toRoom}`)
//       socket.to(toRoom).emit("message", message)
//     } catch (error) {
//       console.log(error.message);
//     }
//   })

//   socket.on("request-session", async ({ astrologerId }) => {
//     const userId = socket.user.id
//     socket.sessionKey = new Date().toISOString()
//     console.log(astrologerId)
//     socket
//       .to(`astrologer-${astrologerId}`)
//       .emit("request-session", { userId, sessionKey: socket.sessionKey })
//   })

//   socket.on("initiate-session", async ({ userId, sessionKey }) => {
//     if (socket.user.role === "user") return socket
//     console.log("send to user and astrologer")
//     const { ID, astrologer_id, user_id } = await Chat.createConversation(
//       userId,
//       socket.user.id
//     )
//     socket.sessionKey = sessionKey
//     console.log("user", user_id, "vs astrologer", astrologer_id)
//     socket
//       .to(`user-${userId}`)
//       .emit("initiate-session", { receiver: astrologer_id, room: ID })
//     socket.send({ receiver: user_id, room: ID })
//   })

//   socket.on("typing", data => {
//     const sender = socket.handshake.query.id
//     const message = {
//       sender,
//       isTyping: data.isTyping,
//     }
//     socket.to(data.receiver).emit("typing", message)
//   })

//   socket.on("disconnect", () => {
//     if (socket.sessionKey === "session-key")
//       console.log("end time", new Date().toLocaleString())
//     console.log("User Disconnected", socket.room, new Date().toLocaleString())
//     delete session[key]
//   })
// })

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
    const room = `private-${details.ID}`
    const access = Token.generateTokens({
      ...details,
      room,
      limit: 5,
    }).accessToken
    session[receiver].socket.join(room)
    socket.join(room)

    socket.handshake.headers.access = access
    session[receiver].socket.handshake.headers.access = access

    socket.emit("accept-session", { status: "OK" })
    session[receiver].socket.emit("accept-session", { status: "OK" })
  })

  socket.on("disconnect", () => {
    console.log("user", socket.room, "disconnected ")
    try {
      const token = Token.verifyAccessToken(socket.handshake.headers.access)
      // socket.broadcast.to(token.room).emit('accept-session','not ok')
      session[`astrologer-${token.astrologer_id}`].socket.handshake.headers.access = null
      session[`user-${token.user_id}`].socket.handshake.headers.access = null
      delete session[socket.room]
    } catch (err) {

    }
  })
  
  socket.on("message", message => {
    try {
      const token = Token.verifyAccessToken(socket.handshake.headers.access)
      socket.broadcast.to(token.room).emit("message", message)
    } catch (error) {
      console.log(error)
      socket.send("invalid token")
    }
  })
})
server.listen(3000, () => {
  console.log("App listening on port 3000!")
})

app.use(errorHandler)
