// Import express
const express = require('express')
const app = express()
const port = 3000

// Set template engine to "Handlebars"
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))


// Initialize Project
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('It\'s a sood start')
})