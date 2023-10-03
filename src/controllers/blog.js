const TODO = require("../utils/Todo")
const asyncHandler = require("../utils/asyncHandler")

async function createBlog(req,res){
    const id = req.id
    TODO()
}
async function updateBlog(req,res){
    const id = req.id
    const blogId = req.params.id
    TODO()
}
async function deleteBlog(req,res){
    const id = req.id
    const blogId = req.params.id
    TODO()
}
async function getBlog(req,res){
    const blogId = req.params.id
    TODO()
}
async function getBlogs(req,res){
    const page = req.query.page
    const limit = req.query.limit
    TODO()
}


module.exports = {
    createBlog:asyncHandler(createBlog),
    updateBlog:asyncHandler(updateBlog),
    deleteBlog:asyncHandler(deleteBlog),
    getBlog:asyncHandler(getBlog),
    getBlogs:asyncHandler(getBlogs)
}