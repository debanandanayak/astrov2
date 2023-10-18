const {Router} = require('express')
const router = Router()
const blog = require('../../controllers/blog')


router.get('/blogs',blog.getBlogs)
router.get('/blogs/:id',blog.getBlog)
router.get('/blogs/recommended',blog.getUserFollowingBlogs)

module.exports = router