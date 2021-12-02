const express = require('express')
const router = express.Router()

const restaurants = require('../../restaurant.json').results

// Restaurant info
router.get('/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === id)

  res.render('show', {
    style: 'show.css',
    restaurant: restaurant
  })
})



module.exports = router