import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

class Database {
  constructor() {
    this.init()
  }

  init() {
    try {
      this.mongoConnection = mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`
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
