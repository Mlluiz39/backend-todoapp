import mongoose from 'mongoose'

class Database {
  constructor() {
    this.init()
  }

  init() {
    try {
      this.mongoConnection = mongoose.connect(
        'mongodb://localhost:27017/todo',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      console.log('MongoDB connected')
    } catch (error) {
      console.log('Error connecting to MongoDB')
    }
  }

  mongo() {
    return this.mongoConnection
  }
}

export default new Database()
