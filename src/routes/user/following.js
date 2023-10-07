const {Router} = require('express')
const following = require('../../controllers/user/following')
const router = Router()

router.post('/following',following.createFollowing)
router.get('/following',following.getFollowing)
router.delete('/following',following.removeFollowing)

module.exports = router