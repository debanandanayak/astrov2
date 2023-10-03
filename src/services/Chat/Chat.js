const client = require("../../../database/client")
const ApiError = require("../../utils/ApiError")

class Chat {
  static async createConversation(userId, astrologerId) {
    const conversation = await client.conversation.upsert({
      create: {
        astrologer_id: astrologerId,
        user_id: userId,
      },
      where: {
        astrologer_id_user_id: {
          astrologer_id: astrologerId,
          user_id: userId,
        },
      },
      update: {
        astrologer_id: astrologerId,
        user_id: userId,
      },
    })
    return conversation
  }
  
  static async sendMessage(sender, conversationId, content) {
    if (!(sender === 'astrologer' || sender==='user')){
      throw new ApiError("Invalid sender | user | astrologer")
    }
    const message = await client.message.create({
      data: {
        content: content,
        sender: sender,
        conversation_id: +conversationId,
      },
    })
    return message
  }

  static async getConversations(id) {
    const conversations = await client.conversation.findMany({
      where: {
        OR:[
            {astrologer_id: id},
            {user_id:id}
        ]
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            content: true,
            createdAt: true,
          },
        },
      },
    })
    return conversations
  }

  static async getChatMessages(conversationId,id) {
    const messages = await client.message.findMany({
      where: {
        conversation_id: conversationId,
        conversation:{
            OR:[
                {astrologer_id:id},
                {user_id:id}
            ]
         },
      },
      orderBy:{
        ID:'desc',
    }
    })
    return messages
  }
}

module.exports = Chat
