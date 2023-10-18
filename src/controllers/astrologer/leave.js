const Leave = require("../../services/Astrologer/Leave")
const asyncHandler = require("../../utils/asyncHandler")
const moment = require('moment')
async function createLeave(req,res){
    const id = req.id
    const {from_date,to_date,reason} = req.body
    const fromDate = moment(from_date).toDate().toISOString()
    const toDate = moment(to_date).toDate().toISOString()
    const leaves = (await Leave.createLeave(id,fromDate,toDate,reason))
    res.status(201).json({leaves:leaves.Astrologer.leaves})
}


async function getLeaves(req,res){
    const limit = +req.query.limit || 10
    const page = +req.query.offset || 1
    const id = req.id
    const leaves = await Leave.getLeaves(id,page,limit)
    console.log(leaves);
    res.json({leaves})
}

module.exports = {
    createLeave:asyncHandler(createLeave),
    getLeaves:asyncHandler(getLeaves)
}