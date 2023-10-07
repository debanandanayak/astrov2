const {Router} = require('express')
const prokerala = require('../../controllers/user/prokerala')
const router = Router()

router.get('/horoscope',prokerala.getHoroscope)
router.post('/panchang',prokerala.getPanchang)

module.exports = router