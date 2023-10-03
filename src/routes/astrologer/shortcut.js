const {Router} = require('express')
const router = Router()
const shortcut = require('../../controllers/astrologer/shortcut')
router.get('/shortcut',shortcut.getShortcuts)
router.post('/shortcut',shortcut.createShortcut)
router.delete('/shortcut',shortcut.deleteShortcut)

module.exports = router