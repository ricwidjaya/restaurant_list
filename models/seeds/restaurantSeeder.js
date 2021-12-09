const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurants = require('../../restaurant.json').results

// Asynchronous callback function then wait for db to create the data
// Close the connection with db
db.once('open', async () => {
  await Restaurant.create(restaurants)
  db.close()
})