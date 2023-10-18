const {Router} = require('express')
const kundali = require('../../controllers/user/kundali')
const { createKundali } = require('../../validation/user/kundali')
const validate = require('../../validation/validate')
const router = Router()

router.post('/kundali',createKundali,validate,kundali.createKundali)
router.get('/kundali',kundali.getKundali)
router.delete('/kundali',kundali.deleteKundali)

module.exports = router