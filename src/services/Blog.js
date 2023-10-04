const client = require('../../database/client')
const getPaginatedPayload = require('../helpers/getPaginatedPayload')
class Blog{
    static async createBlog(astrologerId,image,content,title){
        const blog = await client.blog_Post.create({
            data:{
                image:image,
                content:content,
                title:title,
                astrologer:{
                    connect:{
                       ID:astrologerId 
                    }
                },
            },
        })
        return blog
    }
    static async updateBlog(astrologerId,id,image,content,title){
        const blog = await client.blog_Post.update({
            where:{
                astrologer_id:astrologerId,
                ID:id
            },data:{
                image,content,title
            }
        })
        return blog
    }
    static async getBlog(id){
        const blog = await client.blog_Post.findFirst({
            where:{
                ID:id
            },include:{
                astrologer:true
            }
        })
        return blog
    }
    static async getBlogs(page=1,limit=20){
        let blogs = await client.blog_Post.findMany({
        })
        blogs = getPaginatedPayload(blogs,page,limit)
        return blogs
    }
    static async deleteBlog(astrologerId,id){
        const blog = await client.blog_Post.delete({
            where:{
                ID:id,
                astrologer_id:astrologerId
            }
        })
        return blog
    }

}

module.exports = Blog