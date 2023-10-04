require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const http = require("http")
const { Server } = require("socket.io")
const astrologer = require('./routes/astrologer/index')
const errorHandler = require('./middlewares/errorHandler')
const Token = require('./services/Token')
const userRouter = require('./routes/user')


app.use(express.json())
app.use(cors({ origin: '*'}));
app.use(cors())
app.use('/astrologer',astrologer)
app.use('/user',userRouter);
app.get('/health', (req, res) => {
  res.send('OK')
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
})


// io.use(verifySocketUser)
io.on("connection", socket => {
  const user = socket.handshake.query.id
  console.log(`User ${user} connected`)
  socket.join(user)
  socket.on('message',(data)=>{
    const sender = socket.handshake.query.id
    const message = {
      message:data.message,
      sender
    }
    console.log(`User ${sender} sent a message to ${data.receiver}`);
    socket.to(data.receiver).emit('message',message)
  })
  socket.on('typing',(data)=>{
    const sender = socket.handshake.query.id
    const message = {
      sender,
      isTyping:data.isTyping
    }
    socket.to(data.receiver).emit('typing',message)
  })
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.handshake.query.id)
  })
})



server.listen(3000, () => {
  console.log('App listening on port 3000!')
})





app.use(errorHandler)