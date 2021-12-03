const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


// Restaurant create page
router.get('/create', (req, res) => {
  res.render('create', {
    style: 'create.css'
  })
})

// View restaurant info
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findOne({ _id: id })
    .lean()
    .then((restaurant) => {
      res.render('show', {
        style: 'show.css',
        restaurant: restaurant
      })
    })
})


module.exports = router