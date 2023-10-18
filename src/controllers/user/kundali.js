const Kundali = require("../../services/User/Kundali")
const asyncHandler = require("../../utils/asyncHandler")

async function createKundali(req, res) {
  const id = +req.id
  console.log(req.body);
  const kundali = await Kundali.createKundali(id, req.body)
  res.status(201).json({
    message: "Kundali created successfully",
  })
}
async function deleteKundali(req,res){
  const id = +req.id
  const ids = req.query.ids.split(' ').map(e=>{
    return +e
  })
  const kundali = await Kundali.deleteKundali(id,ids)
  res.status(204).send(kundali)
}

async function getKundali(req, res) {
  const id = +req.id
  const kundali = await Kundali.getKundali(id)
  res.status(200).json([...kundali])
}
module.exports = {
  createKundali: asyncHandler(createKundali),
  deleteKundali: asyncHandler(deleteKundali),
  getKundali: asyncHandler(getKundali),
}
