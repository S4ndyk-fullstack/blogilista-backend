const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../model/blog')

const initialBlogs = [
  {
    title: "Not a blog",
    author: "G.R.R Martin",
    url: "notablog.com",
    likes: 15022
  },
  {
    title: "Best blog",
    author: "Blogger Dude",
    url: "bestblog.com",
    likes: 8
  }
]


describe('blog tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('list has righ amount of blogs', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(initialBlogs.length)
  })

  test('id field is defined', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
  })

  test('can add blogs to database', async () => {
    const testNote = {
      title: "Foodie Life",
      author: "Matti Meikalainen",
      url: "foodie.com",
      likes: 14
    }
    const res = await api.post('/api/blogs')
      .send(testNote)
      .expect(201)

    expect(res.body.title).toBe("Foodie Life")
    expect(res.body.author).toBe("Matti Meikalainen")
    expect(res.body.likes).toBe(14)

    const list = await api.get('/api/blogs')
    expect(list.body.length).toBe(initialBlogs.length + 1)
  })


  test('if likes not defined default to 0', async () => {
    const testNote = {
      title: "Foodie Life",
      author: "Matti Meikalainen",
      url: "foodie.com",
    }
    const res = await api.post('/api/blogs')
      .send(testNote)
      .expect(201)
    expect(res.body.likes).toBe(0)
  })

  test('bad request if title or author undefined', async () => {
    const testNote1 = {
      author: "Matti Meikalainen",
      url: "foodie.com",
    }

    const testNote2 = {
      title: "Foodie Life",
      url: "foodie.com",
    }

    await api.post('/api/blogs')
      .send(testNote1)
      .expect(400)

    await api.post('/api/blogs')
      .send(testNote2)
      .expect(400)
  })

  test('delete takes away from list', async () => {
    const testNote = {
      title: "Foodie Life",
      author: "Matti Meikalainen",
      url: "foodie.com",
      likes: 14
    }

    const noteToDelete = await api.post('/api/blogs')
      .send(testNote)
      .expect(201)
    
    await api.delete(`/api/blogs/${noteToDelete.body.id}`)
      .expect(204)
  })


  afterAll(() => mongoose.connection.close())
})


