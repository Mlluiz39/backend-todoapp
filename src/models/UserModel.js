const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      return validator.isEmail(value), { message: 'Invalid Email address' }
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('users', userSchema)
