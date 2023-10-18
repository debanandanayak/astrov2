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

  static async sendMessage(sender, conversationId, id, content) {
    if (!(sender === "astrologer" || sender === "user")) {
      throw new ApiError("Invalid sender | user | astrologer")
    }
    const message = await client.message.create({
      data: {
        content: content,
        sender: sender,
        conversation_id: +conversationId,
        astrologer_id: sender === "astrologer" ? id : undefined,
        userId: sender === "user" ? id : undefined,
      },
    })
    console.log(message)
    return message
  }

  static async getConversations(id, role) {
    const conversations = await client.conversation.findMany({
      where: {
        OR: [
          { astrologer_id: role === "astrologer" ? id : undefined },
          { user_id: role === "user" ? id : undefined },
        ],
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
            sender: true,
          },
        },
      },
    })
    return conversations
  }

  static async getChatMessages(conversationId, id) {
    const messages = await client.message.findMany({
      where: {
        conversation_id: conversationId,
        conversation: {
          OR: [{ astrologer_id: id }, { user_id: id }],
        },
      },
      orderBy: {
        ID: "desc",
      },
    })
    return messages
  }

  static async getChatPayload(userId, astrologerId) {
    const data = await client.conversation.findFirst({
      where: {
        astrologer_id: astrologerId,
        user_id: userId,
      },
      include: {
        user: {
          select: {
            wallet: true,
            name: true,
          },
        },
        astrologer: {
          select: {
            rates: {
              take: 1,
            },
            first_name: true,
            last_name: true,
          },
        },
      },
    })
    console.log(data);
    const payload = {
      conversationId: data.ID,
      user: data.user.name,
      userId: data.user_id,
      userWalletId: data.user.wallet.ID,
      maxChatTime: data.astrologer.rates[0].chat_rate<=0?20:
        data.user.wallet.balance / data.astrologer.rates[0].chat_rate,
      rate:{
        ...data.astrologer.rates[0]
      },
      astrologerName:
        data.astrologer.first_name + " " + data.astrologer.last_name,
      astrologerId: data.astrologer_id,
    }
    return payload
  }
}

module.exports = Chat
