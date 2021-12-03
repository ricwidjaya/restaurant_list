const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'desc' }) // new restaurant shows first
    .then(restaurants => {
      // Change MongoDB ObjectId into string
      restaurants.forEach(restaurant => {
        restaurant._id = restaurant._id.toString()
      })
      return restaurants
    })
    .then((restaurants) => {
      res.render('index', {
        style: 'index.css',
        restaurant: restaurants
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

// Search feature
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()

  // Search restaurant's name or category
  const filteredRestaurant = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) ||
    restaurant.category.toLowerCase().includes(keyword))

  res.render('index', {
    style: 'index.css',
    restaurant: filteredRestaurant,
    keyword: keyword
  })
})

module.exports = router