const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurants = require('../../restaurant.json').results

db.once('open', () => {
  for (let i = 0; i < restaurants.length; i++) {
    Restaurant.create({
      name: restaurants[i].name,
      name_en: restaurants[i].name_en,
      category: restaurants[i].category,
      image: restaurants[i].image,
      location: restaurants[i].location,
      phone: restaurants[i].phone,
      rating: restaurants[i].rating,
      description: restaurants[i].description,
    })
  }
  console.log('Done')
})
