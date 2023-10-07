const Chat = require("../../services/Chat/Chat")
const TODO = require("../../utils/Todo")
const asyncHandler = require("../../utils/asyncHandler")

async function getConversations (req, res){
  const id = req.id
  const role = req.role.toLowerCase()
  const conversations = await Chat.getConversations(id,role)
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
  const message = await Chat.sendMessage(sender,conversationId,id,content)
  res.json({message})
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
