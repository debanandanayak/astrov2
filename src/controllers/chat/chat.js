const Chat = require("../../services/Chat/Chat")
const TODO = require("../../utils/Todo")
const asyncHandler = require("../../utils/asyncHandler")

async function getConversations (req, res){
  const id = req.id
  const conversations = await Chat.getConversations(id)
  res.json(conversations)
}

async function getChatMessages(req, res){
  const conversationId = req.params.id
  const id = req.id
  const messages = await Chat.getChatMessages(+conversationId, id)
  res.json(messages)
}

async function sendMessage (req,res){
  const content =  req.body.content
  const id = req.id
  const conversationId = req.params.id
  const sender = req.role.toLowerCase()
  console.log(sender);
  await Chat.sendMessage(sender,conversationId,content)
  res.send('ok')
}

async function createConversation(req,res){
  TODO()
}
module.exports = {
  getChatMessages: asyncHandler(getChatMessages),
  getConversations:asyncHandler(getConversations),
  sendMessage:asyncHandler(sendMessage),
  createConversation:asyncHandler(createConversation)
}
