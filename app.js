// Import express
const express = require("express")

// env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const app = express()
const methodOverride = require("method-override")
require("./config/mongoose")
const routes = require("./routes")

// Method Override
app.use(methodOverride("_method"))

// Set template engine to "Handlebars"
const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

// Set body parser
app.use(express.urlencoded({ extended: true }))

// Set static files
app.use(express.static("public"))

// Routers
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log("Server Started")
})
