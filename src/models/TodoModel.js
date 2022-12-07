const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('todos', todoSchema)
