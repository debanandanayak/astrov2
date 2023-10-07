const razorpay = require('../utils/razorpay')
const shortid = require('shortid')
const crypto = require('crypto')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
async function createOrder(req, res){
  const { amount, currency } = req.body
    if(amount === undefined || amount === 0) throw new ApiError(400,"amount is required")
  var options = {
    amount: amount * 100,
    currency: "INR",
    receipt: shortid.generate(),
  }
  const response = await razorpay.orders.create({...options,notes:{id:req.id}})
  console.log(response)
  res.json({ id: response.id, currency: response.currency,amount })
}
async function onCapturePayment(req, res){
  const SECRET = "deba"
  const body = req.body

  const sha = crypto.createHash('sha256',SECRET)
  sha.update(JSON.stringify(body))
  const digest = sha.digest('hex')
  const signature = req.headers['x-razorpay-signature']
  if(signature===digest){
    console.log('request processing')
    console.log(req.body);
    const id = req.body.payload.payment.entity.notes.id
    console.log(id);
  }
  res.json({ status: "ok" })
}

module.exports = {createOrder:asyncHandler(createOrder),onCapturePayment:asyncHandler(onCapturePayment)}
