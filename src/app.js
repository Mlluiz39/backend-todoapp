const express = require('express')
const app = express()
const dataBase = require('./db/database')
const bodyParser = require('body-parser')
const cors = require('cors')

//Rotas
app.use(bodyParser.json())
app.use(cors())
const index = require('./routes/index')
const todoRoute = require('./routes/todoRouter')
app.use('/', index)
app.use('/todos', todoRoute)

module.exports = app
