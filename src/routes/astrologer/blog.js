const {Router} = require('express')
const router = Router()
const blog = require('../../controllers/blog')
const upload = require('../../middlewares/upload')

router.post('/blog',upload.single('image'),blog.createBlog)
router.post('/blog/:id',blog.updateBlog)
router.delete('/blog/:id',blog.deleteBlog)
router.get('/blogs',blog.getBlogs)
router.get('/blog/:id',blog.deleteBlog)

module.exports = router