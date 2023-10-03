const Shortcut = require("../../services/Astrologer/Shortcut")
const asyncHandler = require('../../utils/asyncHandler')
async function createShortcut(req,res){
    const id = req.id
    const {shortcut,message} =  req.body
    const newShortcut = await Shortcut.createShortcut(id,shortcut,message)
    res.json({newShortcut})
}

async function deleteShortcut(req,res){
    const id = req.id
    const {shortcut} =  req.body
    const deletedShortcut = await Shortcut.deleteShortcut(id,shortcut)
    res.json({deletedShortcut})
}

async function getShortcuts(req,res){
    const id = req.id
    const shortcuts = await Shortcut.getShortcuts(id)
    res.json(shortcuts)
}

module.exports = {
    createShortcut:asyncHandler(createShortcut),
    deleteShortcut:asyncHandler(deleteShortcut),
    getShortcuts:asyncHandler(getShortcuts)
}