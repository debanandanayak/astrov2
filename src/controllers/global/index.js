const client = require("../../../database/client")
const asyncHandler = require("../../utils/asyncHandler")

async function language(req, res) {
  const language = await client.language.findMany()
  res.json({ language })
}

async function category(req, res) {
  const category = await client.astrologerType.findMany({select:{
    ID:true,
    type:true
  }})
  res.json({ category })
}

module.exports = {
    language: asyncHandler(language),
    category: asyncHandler(category),
}
