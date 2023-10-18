require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http")
const path = require("path")
const fs = require("fs")
const { Server } = require("socket.io")
const astrologer = require("./routes/astrologer/index")
const errorHandler = require("./middlewares/errorHandler")
const userRouter = require("./routes/user")
const publicRouter = require("./routes/public/index")
const global = require("./routes/global/index")
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
app.use("/", global)

app.get("/capture", onCapturePayment)
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
})

app.get("/image/:name", async (req, res) => {
  const name = req.params.name
  console.log(name)
  try {
    const imagePath = path.join(__dirname, `../public/images/${name}`)
    fs.accessSync(imagePath)
    res.sendFile(imagePath)
  } catch (error) {
    res.status(404).json({ message: "No such file found" })
  }
})

app.get("/some", (req, res) => {
  console.log(connectedUsers.size)
  res.send({ count: connectedUsers.size })
})

const connectedUsers = new Map()
const astrologerSessions = new Map()
const userRequestedSession = new Map()
io.use(verifySocketUser)

// io.on("connection", socket => {
//   console.log("user connected :",socket.user)
//   socket.join(socket.room)
//   connectedUsers.set(socket.room, socket)
//   console.log(connectedUsers.size)
//   socket.on("request-session", ({ id }) => {
//     let receiver = socket.user.role === "user" ? "astrologer" : "user"
//     receiver = receiver + "-" + id
//     astrologerSessions.set(receiver,{...astrologerSessions.get(receiver),[socket.room]:{id:socket.user.id,name:"Someone"}})
//     if (!connectedUsers.get(receiver)) {
//       socket.send("astrologer unavailable")
//       return
//     }
//     if(connectedUsers[receiver].socket.handshake.headers.access){
//       console.log('busy',connectedUsers[receiver].socket.handshake.headers.access);
//       socket.send(`${receiver} is busy`)
//       return
//     }
//     connectedUsers.get(receiver).socket.emit("accept-session", { id: socket.user.id })
//   })

//   socket.on("accept-session", async ({ id }) => {
//     let receiver = socket.user.role === "user" ? "astrologer" : "user"
//     receiver = receiver + "-" + id
//     if (!connectedUsers[receiver]) {
//       socket.send(`${receiver} unavailable`)
//       return
//     }
//     if(connectedUsers[receiver].socket.handshake.headers.access){
//       console.log('busy',connectedUsers[receiver].socket.handshake.headers.access);
//       socket.send(receiver,'is busy')
//       return
//     }
//     console.log(receiver)
//     const conversation = await Chat.createConversation(id, socket.user.id)
//     const chatSession = await client.chatSession.create({
//       data:{
//         conversation_id:conversation.ID
//       }
//     })
//     const room = `private-${details.ID}`
//     const payload = await Chat.getChatPayload(conversation.user_id, conversation.astrologer_id)
//     if(payload.maxChatTime <=0){
//       connectedUsers[receiver].socket.send("Insufficient fond, please recharge your wallet !")
//     }
//     const access = Token.generateTokens({
//       ...payload,
//       room,
//       chatSession,
//     },`${payload.maxChatTime}m`).accessToken

//     console.log(access);
//     connectedUsers[receiver].socket.join(room)
//     socket.join(room)

//     socket.handshake.headers.access = access
//     connectedUsers[receiver].socket.handshake.headers.access = access

//     socket.emit("accept-session", { status: "OK" })
//     connectedUsers[receiver].socket.emit("accept-session", { status: "OK" })
//   })

//   socket.on("message", message => {
//     try {
//       const token = Token.verifyAccessToken(socket.handshake.headers.access)
//       Chat.sendMessage(socket.user.role,token.conversationId,socket.user.id,message)
//       socket.broadcast.to(token.room).emit("message", message)
//     } catch (error) {
//       console.log(error)
//       socket.send("invalid token")
//       socket.disconnect()
//     }
//   })

//   socket.on("disconnect", async (reason) => {
//     console.log(reason);
//     console.log("user", socket.room, "disconnected ")
//     try {
//       const data = Token.decodeAccessToken(socket.handshake.headers.access)
//       console.log(data);
//       let endTime = Date.now()
//       if(endTime>data.exp*1000){
//         endTime = new Date(data.exp*1000).getTime()
//       }
//       endTime = new Date(endTime).toISOString()
//       const sessionDetails = await client.chatSession.update({
//         where: {
//           ID: data.chatSession.ID,
//         },data: {
//           session_end: endTime,
//         }
//       })
//       console.log(sessionDetails)
//       connectedUsers[`astrologer-${data.astrologer_id}`].socket.handshake.headers.access = null
//       connectedUsers[`user-${data.user_id}`].socket.handshake.headers.access = null
//       delete connectedUsers[socket.room]
//     } catch (err) {
//       console.log(err)

//     }finally{
//       connectedUsers.delete(socket.room)
//     }

//   })
// })

io.on("connection", socket => {
  if (connectedUsers.get(socket.room)) {
    socket.disconnect()
    return
  }
  connectedUsers.set(socket.room, socket)
  socket.join(socket.room)
  console.log(socket.user.role, "connected :", socket.user)
  socket.on("message", message => {
    if(!socket.handshake.headers.access) return
    const {type,content} = message
    try {
      const token = Token.verifyAccessToken(socket.handshake.headers.access)
      Chat.sendMessage(
        socket.user.role,
        token.conversationId,
        socket.user.id,
        content
      )
      socket.broadcast.to(token.room).emit("message", content)
    } catch (error) {
      console.log(error);
      socket.send("Session expired")
      const decodeToken = Token.decodeAccessToken(socket.handshake.headers.access)
      socket.leave(decodeToken?.room)
    }
  })
  socket.on("request session", data => {
    const { id } = data
    let receiver = socket.user.role === "user" ? "astrologer" : "user"
    receiver = receiver + "-" + id
    if (!connectedUsers.get(receiver)) {
      socket.send({ success: false, message: "astrologer unavailable" })
      return
    }
    if (userRequestedSession.get(socket.room)) {
      socket.send("Multiple requests are not allowed")
      return
    }
    userRequestedSession.set(socket.room, receiver)
    astrologerSessions.set(receiver, [
      ...(astrologerSessions?.get(receiver) || []),
      socket.user,
    ])
    socket.to(receiver).emit("notification", astrologerSessions.get(receiver))
    socket.send({ success: true, message: "request sent successfully" })
  })

  socket.on("cancel session", data => {
    const sessionOwner = userRequestedSession.get(socket.room)
    userRequestedSession.delete(socket.room)
    const list = astrologerSessions
      .get(sessionOwner)
      ?.filter(e => e.id !== socket.user.id)
    console.log(sessionOwner, list)
    astrologerSessions.set(sessionOwner, list)
    socket.to(sessionOwner).emit("notification", list)
    socket.send("You cancelled the request")
  })

  socket.on("accept session", async data => {
    const { id } = data
    
    const receiver = `user-${id}`
    const isRequested = astrologerSessions.get(socket.room)?.find((user)=>id===user.id)
    if(!isRequested){
      socket.send("Not in yor waiting list")
      return
    }
    if(!connectedUsers.get(receiver)){
      socket.send("User is not connected")
      return
    }
    const conversation = await Chat.createConversation(id, socket.user.id)
    const chatSession = await client.chatSession.create({
      data: {
        conversation_id: conversation.ID,
      },
    })

    const room = `private-${conversation.ID}`
    const payload = await Chat.getChatPayload(
      conversation.user_id,
      conversation.astrologer_id
    )
    if (payload.maxChatTime <= 0) {
      connectedUsers.get(receiver).socket.send(
        "Insufficient fond, please recharge your wallet !"
      )
    }
    const access = Token.generateTokens(
      {
        ...payload,
        room,
        chatSession,
      },
      `10m`
    ).accessToken
    // ${payload.maxChatTime}
    console.log(access)
    connectedUsers.get(receiver).join(room)
    socket.join(room)

    socket.handshake.headers.access = access
    connectedUsers.get(receiver).handshake.headers.access = access

    socket.emit("accept session", {
      success: true,
      message: "connection established",
    })
    connectedUsers.get(receiver).emit("accept session", {
      success: true,
      message: "connection established",
    })
  })
  socket.on("disconnect", () => {
    socket.to('astrologer-10').emit('message',({success: false, content:"disconnected"}))
    console.log(socket.user.role, "disconnected :", socket.user)
    try {
    } catch (error) {
    } finally {
      userRequestedSession.delete(socket.room)
      astrologerSessions.delete(socket.room)
      connectedUsers.delete(socket.room)
    }
  })
})


function handleRoomTermination(){

}



server.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})

app.use(errorHandler)
