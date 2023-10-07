require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
const astrologer = require("./routes/astrologer/index")
const errorHandler = require("./middlewares/errorHandler")
const userRouter = require("./routes/user")
const publicRouter = require("./routes/public/index")
const verifySocketUser = require("./middlewares/verifySocketUser")
const Chat = require("./services/Chat/Chat")
const { onCapturePayment } = require("./controllers/payment")

app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(cors())
app.use("/public", publicRouter)
app.use("/astrologer", astrologer)
app.use("/user", userRouter)
app.get("/health", (req, res) => {
  res.send("OK")
})
app.get('/capture', onCapturePayment)
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
})

const session = {}
io.use(verifySocketUser)
io.on("connection", socket => {
  const key = socket.room
  const room = socket.room
  if (session[key]) {
    socket.disconnect()
  }
  session[key] = { socket }
  socket.join(room)
  console.log(`User connected to room ${room}`)
  socket.on("message", async data => {
    const sender = socket.room
    const message = {
      message: data.message,
      sender,
    }
    if(!data.room) return
    try {
      await Chat.sendMessage(socket.user.role, data.room, data.message)
      let receiverRole = socket.user.role === "user" ? "astrologer" : "user"
      const toRoom = `${receiverRole}-${data.receiver}`
      console.log(`User ${sender} sent a message to ${toRoom}`)
      socket.to(toRoom).emit("message", message)
    } catch (error) {
      console.log(error.message);
    }
  })

  socket.on("request-session", async ({ astrologerId }) => {
    const userId = socket.user.id
    socket.sessionKey = new Date().toISOString()
    console.log(astrologerId)
    socket
      .to(`astrologer-${astrologerId}`)
      .emit("request-session", { userId, sessionKey: socket.sessionKey })
  })

  socket.on("initiate-session", async ({ userId, sessionKey }) => {
    if (socket.user.role === "user") return socket
    console.log("send to user and astrologer")
    const { ID, astrologer_id, user_id } = await Chat.createConversation(
      userId,
      socket.user.id
    )
    socket.sessionKey = sessionKey
    console.log("user", user_id, "vs astrologer", astrologer_id)
    socket
      .to(`user-${userId}`)
      .emit("initiate-session", { receiver: astrologer_id, room: ID })
    socket.send({ receiver: user_id, room: ID })
  })

  socket.on("typing", data => {
    const sender = socket.handshake.query.id
    const message = {
      sender,
      isTyping: data.isTyping,
    }
    socket.to(data.receiver).emit("typing", message)
  })

  socket.on("disconnect", () => {
    if (socket.sessionKey === "session-key")
      console.log("end time", new Date().toLocaleString())
    console.log("User Disconnected", socket.room, new Date().toLocaleString())
    delete session[key]
  })
})

server.listen(3000, () => {
  console.log("App listening on port 3000!")
})

app.use(errorHandler)
