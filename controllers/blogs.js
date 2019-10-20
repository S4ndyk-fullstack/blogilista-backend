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

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log('ADDING ', blog.toJSON().title)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
            console.log("ADDING SUCCESFULL")
        })
})

module.exports = blogRouter