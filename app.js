const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3003

app.use(bodyParser.json())

const todos = require('./routes/todos');

app.use('/api/todos', todos);

mongoose
  .connect('mongodb://mlluiz:julia2912@132.226.242.241:27017/admin', {
    useNewUrlParser: true,
  })
  .then(result => {
    console.log('MongoDB Conectado')
  })
  .catch(error => {
    console.log(error)
  })

app.listen(port, () => console.log(`Server is running in port ${port}`))
