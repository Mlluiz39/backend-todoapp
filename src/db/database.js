const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

module.exports = mongoose
  .connect(`mongodb://${DB_USER}:${DB_PASS}@132.226.242.241:27017/${DB_NAME}`, {
    useNewUrlParser: true,
  })
  .then(result => {
    console.log('MongoDB Conectado')
  })
  .catch(error => {
    console.log(error)
  })
