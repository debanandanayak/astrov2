const client = require("../../../database/client")

class Wallet {
  static async getWallet(walletId, userId) {
    const wallet = client.wallet.findUnique({
      where: {
        OR: [{ user_id: userId }, { ID: walletId }],
      },
      include: {
        user: {
          select: {
            ID: true,
            name: true,
            phone_number: true,
          },
        },
      },
    })
    return wallet
  }
  static async createTransaction(walletId, amount, type, description) {
    if (!(type !== "recharge" || type !== "spend"))
      throw new Error("Invalid transaction type")
    const transaction = client.transaction.create({
      data: {
        wallet_id: walletId,
        amount: amount,
        type: type,
        description: description,
      },
    })
    return transaction
  }

  static async getTransactions(userID, walletId) {
    const transactions = await client.transaction.findMany({
      where: {
        OR: [
          { wallet_id: walletId },
          {
            wallet: {
              user_id: userID,
            },
          },
        ],
      },
    })

    return transactions
  }
}

module.exports = Wallet
