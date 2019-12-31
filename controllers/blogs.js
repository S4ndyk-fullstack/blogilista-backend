const blogRouter = require('express').Router()
const Blog = require('../model/blog')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
            console.log('RETRIEVED BLOGS')
        })
})

blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    console.log('ADDING ', request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
            console.log("ADDING SUCCESFULL")
        })
        .catch(error => {
            response.status(400)
            next(error)
        })
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (exception) {
        response.status(404)
        next(exception)
    }
})

module.exports = blogRouter