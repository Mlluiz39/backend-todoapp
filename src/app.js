const express = require('express')
const routes = require('./routes')

const cors = require('cors')

require('./database')

class App {
  constructor() {
    this.app.use(cors())
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
  }

  routes() {
    this.app.use(routes)
  }
}

module.exports = new App().app
