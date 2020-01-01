const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../util/config')
const Blog = require('../model/blog')
const User = require('../model/user')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user')
        response.json(blogs.map(blog => blog.toJSON()))
    } catch (exception) {
        response.status(400)
        next(exception)
    }

})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    try {
        console.log(request.token)
        const decodedToken = jwt.verify(request.token, config.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(400).json({ error: "invalid token" })
        }
        const user = await User.findById(decodedToken.id)
        const newBlog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
        const savedBlog = await newBlog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())

    } catch (exception) {
        response.status(400)
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, config.SECRET)
        if(!request.token || !decodedToken.id) {
            return response.status(400).json({ error: "invalid token" })
        }
        const blogToDelete = await Blog.findById(request.params.id)
        if(blogToDelete.user.toString() === decodedToken.id.toString()) {
            await Blog.findByIdAndDelete(blogToDelete._id)
            response.status(204).end()
        } else {
            response.status(401).end()
        }

    } catch (exception) {
        response.status(404)
        next(exception)
    }
})

module.exports = blogRouter