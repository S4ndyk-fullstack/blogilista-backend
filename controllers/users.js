const User = require('../model/user')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(user => user.toJSON()))
  } catch (error) {
    response.status(400)
    next(error)
  }
})

userRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (body.password.length < 3) {
      response.status(400).send({error: "password too short"}).end()
    }

    const passwordhash = await bcrypt.hash(body.password, 10)
    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordhash
    })
    await newUser.save()
    response.status(201).json(newUser.toJSON())
  } catch (error) {
    response.status(400)
    next(error)
  }
})

module.exports = userRouter