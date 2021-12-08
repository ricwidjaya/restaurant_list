const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// View restaurant info
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById({ id })
    .lean()
    .then((restaurant) => {
      res.render('show', {
        style: 'show.css',
        restaurant,
        id
      })
    })
})

// Restaurant create page
router.get('/create', (req, res) => {
  res.render('create', {
    style: 'create.css',
    script: 'create.js'
  })
})

// Create restaurant
router.post('/', (req, res) => {
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

// Edit restaurant page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => {
      res.render('edit', {
        style: 'create.css',
        script: 'edit.js',
        restaurant,
        id
      })
    })
})

// Update restaurant
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, phone, category, image, rating, location, description } = req.body
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.rating = rating
      restaurant.description = description
      restaurant.save()
    })
    .then(res.redirect(`/restaurants/${id}`))
    .catch((error) => {
      console.log(error)
    })
})

// Delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.delete()
    })
    .then(res.redirect('/'))
    .catch((error) => {
      console.log(error)
    })
})


module.exports = router