const express = require('express')
const router = express.Router()

const restaurants = require('../../restaurant.json').results

router.get('/', (req, res) => {
  res.render('index', {
    style: 'index.css',
    restaurant: restaurants
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