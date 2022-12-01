const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
  description: String,
  done: Boolean,
})

module.exports = mongoose.model('todos', todoSchema)
