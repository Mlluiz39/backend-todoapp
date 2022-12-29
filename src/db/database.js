const mongoose = require('mongoose')
mongoose.Promise = global.Promise

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
