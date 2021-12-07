const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


// Restaurant create page
router.get('/create', (req, res) => {
  res.render('create', {
    style: 'create.css',
    script: 'create.js'
  })
})

// Create restaurant
router.post('/create', (req, res) => {
  const { name, name_en, phone, category, image, rating, location, description } = req.body

  Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    rating,
    description
  })

  res.redirect('/')
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

// Edit restaurant page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findOne({ _id: id })
    .lean()
    .then((restaurant) => {
      res.render('create', {
        style: 'create.css',
        script: 'create.js',
        restaurant: restaurant
      })
    })
})


module.exports = router