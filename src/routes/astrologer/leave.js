const {Router} = require('express')
const { getLeaves, createLeave } = require('../../controllers/astrologer/leave')
const router = Router()
const astrologerValidation =require("../../validation/astrologer/leaves")

router.get('/leave',getLeaves)
router.post('/leave',astrologerValidation.leaves,createLeave)

module.exports = router