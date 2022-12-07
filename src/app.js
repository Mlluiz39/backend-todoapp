require('dotenv').config()
const express = require('express')
const app = express()
const dataBase = require('./db/database')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

//Rotas
app.use(bodyParser.json())
app.use(cors())
const index = require('./routes/index')
const todoRoute = require('./routes/todoRouter')
const userRoute = require('./routes/userRouter')
app.use('/', index)
app.use('/todos', todoRoute)
app.use('/users', userRoute)

module.exports = app
