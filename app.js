// Import express
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const port = 3000
require('./config/mongoose')
const routes = require('./routes')

// Method Override
app.use(methodOverride('_method'))

// Set template engine to "Handlebars"
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set body parser
app.use(express.urlencoded({ extended: true }))

// Set static files
app.use(express.static('public'))

// Routers
app.use(routes)

app.listen(port, () => {
  console.log('Server Started')
})