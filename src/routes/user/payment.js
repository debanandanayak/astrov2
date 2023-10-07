const { Router } = require("express")
const router = Router()
const { createOrder } = require("../../controllers/payment")
router.post("/payment", createOrder)


module.exports = router
