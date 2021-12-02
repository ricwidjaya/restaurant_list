const mongoose = require('mongoose')

// Connect to mongoDB
const MONGODB_URI = process.env.MONGODB_URL ||
  'mongodb://localhost/restaurant-list'
mongoose.connect(MONGODB_URI)

const db = mongoose.connection


db.on('error', () => {
  console.log('Failed to Connect MongoDB')
})


db.once('open', () => {
  console.log('MongoDB Connected!')
})


module.exports = db