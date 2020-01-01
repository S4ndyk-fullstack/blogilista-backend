const loginRouter = require('express').Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../util/config')

loginRouter.post('/', async (request, response, next) => {
  const username = request.body.username
  const password = request.body.password
  const user = await User.findOne({ username: username })
  const correctPassword = user === null ? false : await bcrypt.compare(password, user.passwordhash)
  if (!(correctPassword && user)) {
    return response.status(401).json({ error: "invalid username or password" })
  }
  const token = jwt.sign({ username, id: user._id }, config.SECRET)
  response.status(200).send({ token, username, name: user.name })
})

module.exports = loginRouter