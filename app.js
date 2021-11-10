// Import express
const express = require('express')
const app = express()
const port = 3000

// Set template engine to "Handlebars"
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const restaurants = require('./restaurant.json')

// Set static files
app.use(express.static('public'))


// Landing page
app.get('/', (req, res) => {
  res.render('index', {
    style: 'index.css'
  })
})

// Restaurant description
app.get('/restaurants/1', (req, res) => {
  res.render('show', {
    style: 'show.css'
  })
})


// Listen request and start server
app.listen(port, () => {
  console.log('It\'s a sood start')
})