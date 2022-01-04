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
const session = require("express-session")
const passport = require("./config/passport")

// Method Override
app.use(methodOverride("_method"))

// Set template engine to "Handlebars"
const exphbs = require("express-handlebars")
app.engine("hbs", exphbs({ extname: ".hbs" }))
app.set("view engine", "hbs")

// Set body parser
app.use(express.urlencoded({ extended: true }))

// Set static files
app.use(express.static("public"))

// Session and passport
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Locals
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

// Routers
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log("Server Started")
})
