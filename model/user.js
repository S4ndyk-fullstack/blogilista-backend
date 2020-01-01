const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = Schema({
  name: String, 
  username: {type: String, minlength: 3, required: true, unique: true},
  passwordhash: {type: String, required: true},
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    default: []
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordhash
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema) 