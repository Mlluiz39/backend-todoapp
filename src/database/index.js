const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')

const User = require('../app/models/User')
const Task = require('../app/models/Task')

const configDatabase = require('../config/database')

const models = [User, Task]

dotenv.config()

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models.map((model) => model.init(this.connection))
  }
}

module.exports = new Database()
