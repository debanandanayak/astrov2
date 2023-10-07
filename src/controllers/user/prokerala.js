const Prokerela = require("../../services/Prokerela")
const asyncHandler = require("../../utils/asyncHandler")

async function getPanchang(req,res){
    const panchang =  await Prokerela.getPanchang()
    res.json({panchang})
}

async function getHoroscope(req,res){
    const horoscope = await Prokerela.getHoroscope()
    res.json({horoscope})
}

module.exports = {
    getPanchang: asyncHandler(getPanchang),
    getHoroscope: asyncHandler(getHoroscope)
}