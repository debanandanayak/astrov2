const {Router} = require('express')
const router = Router()
const chat = require('../../controllers/chat/chat')
router.post('/conversation',chat.createConversation)
router.get('/conversations',chat.getConversations)
router.post('/chat/:id',chat.sendMessage)
router.get('/chats/:id',chat.getChatMessages)




module.exports = router