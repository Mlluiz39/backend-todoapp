const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

module.exports = mongoose
  .connect(`mongodb://144.22.225.20:27017/mongo`, {
    useNewUrlParser: true,
  })
  .then(result => {
    console.log('MongoDB Conectado')
  })
  .catch(error => {
    console.log(error)
  })
