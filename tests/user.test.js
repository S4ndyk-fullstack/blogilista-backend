const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../model/user')

beforeEach(async () => {
  U
  User.deleteMany({})

})