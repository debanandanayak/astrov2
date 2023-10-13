const Support = require("../../services/User/Support")
const asyncHandler = require("../../utils/asyncHandler")

async function createSupport(req, res) {
    const { phone_number, subject, description } = req.body
    const image = req.file.originalname
    const support = await Support.createSupport(phone_number, subject, description, image)
    res.json({ support })
}
async function getSupport(req, res) {
    const supportNumber = req.params.phone_number
    const support = await Support.getSupport(supportNumber)
    res.json({ support })
}
async function deleteSupport(req, res) {
 
    const supportId = +req.params.id
    const deletedSupport = await Support.deleteSupport(supportId)
    res.json({ deletedSupport })
}

module.exports = {
    createSupport: asyncHandler(createSupport),
    getSupport: asyncHandler(getSupport),
    deleteSupport: asyncHandler(deleteSupport)
}