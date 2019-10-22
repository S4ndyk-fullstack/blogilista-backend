const _ = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const mostBlogs = blogs => {
    const counted = _.countBy(blogs, blog => blog.author)
    const transformed = _.keys(counted).map(key => {
        return {
            author: key,
            blogs: counted[key]
        }
    })
    return _.maxBy(transformed, 'blogs')
}

const mostLikes = blogs => {
}

module.exports = { dummy, totalLikes, mostBlogs, mostLikes }