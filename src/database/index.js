import mongoose from 'mongoose'

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/todo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  mongo() {
    return this.mongoConnection
  }
}

export default new Database()
