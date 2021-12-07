const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Restaurant = new Schema({
  name: {
    type: String,
    require: true,
  },
  name_en: {
    type: String
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', Restaurant)