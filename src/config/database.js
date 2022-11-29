const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://mlluiz:julia2912@132.226.242.241:27017/admin')
