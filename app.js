// Import express
const express = require('express')
const app = express()
const port = 3000

// Initialize Project
app.get('/', (req, res) => {
  console.log('Project Initialized')
  res.send('<h1>Express GO!!</h1>')
})

app.listen(port, () => {
  console.log('It\'s a sood start')
})