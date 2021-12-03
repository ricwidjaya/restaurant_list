const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


// Restaurant info
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findOne({ _id: id })
    .lean()
    .then((restaurant) => {
      console.log(restaurant)
      res.render('show', {
        style: 'show.css',
        restaurant: restaurant
      })
    })
})



module.exports = router