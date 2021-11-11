// Import express
const express = require('express')
const app = express()
const port = 3000

// Set template engine to "Handlebars"
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Load restaurant data
const restaurants = require('./restaurant.json').results

// Set static files
app.use(express.static('public'))


// Landing Page
app.get('/', (req, res) => {
  res.render('index', {
    style: 'index.css',
    restaurant: restaurants
  })
})

// Restaurant info
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === id)

  res.render('show', {
    style: 'show.css',
    restaurant: restaurant
  })
})

// Search page
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const filteredRestaurant = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword))

  res.render('index', {
    style: 'index.css',
    restaurant: filteredRestaurant,
    keyword: keyword
  })
})



app.listen(port, () => {
  console.log('Server Started')
})