const Blog = require("../services/Blog")
const asyncHandler = require("../utils/asyncHandler")

async function createBlog(req,res){
    const id = req.id
    const {image,title,content} = req.body
    const newBlog = await Blog.createBlog(id,image,content,title)
    res.json({newBlog})
}
async function updateBlog(req,res){
    const id = req.id
    const blogId = +req.params.id
    const {image,title,content} = req.body
    const updated = await Blog.updateBlog(id,blogId,image,content,title)
    res.json({updatedBlog:updated})
}
async function deleteBlog(req,res){
    const id = req.id
    const blogId = +req.params.id
    const deletedBlog = await Blog.deleteBlog(id,blogId)
    res.json({deletedBlog})
}
async function getBlog(req,res){
    const blogId = +req.params.i
    const blog = await Blog.getBlog(blogId)
    res.json({blog})
}
async function getBlogs(req,res){
    const page = req.query.page
    const limit = req.query.limit
    const blogs = await Blog.getBlogs(page,limit)
    res.json({blogs})
}

async function getUserFollowingBlogs(req,res){
    const page = req.query.page
    const limit = req.query.limit
    const blogs = await Blog.getUserFollowingBlogs(page,limit)
    res.json({blogs})
}

module.exports = {
    createBlog:asyncHandler(createBlog),
    updateBlog:asyncHandler(updateBlog),
    deleteBlog:asyncHandler(deleteBlog),
    getBlog:asyncHandler(getBlog),
    getBlogs:asyncHandler(getBlogs),
    getUserFollowingBlogs:asyncHandler(getUserFollowingBlogs),
}