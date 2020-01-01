require('dotenv').config()

const PORT = process.env.PORT 
const mongoUrl = process.env.MONGODB_URI
const SECRET = process.env.SECRET

module.exports = { PORT, mongoUrl, SECRET }