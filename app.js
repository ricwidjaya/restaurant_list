// Import express
const express = require('express')
const app = express()
const port = 3000
require('./config/mongoose')
const routes = require('./routes')

// Set template engine to "Handlebars"
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Load restaurant data
const restaurants = require('./restaurant.json').results

// Set static files
app.use(express.static('public'))


// Routers
app.use(routes)



app.listen(port, () => {
  console.log('Server Started')
})