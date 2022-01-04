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
const flash = require("connect-flash")

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
app.use(flash())

// Locals
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.success_messages = req.flash("success_messages")
  res.locals.error_messages = req.flash("error_messages")
  next()
})

// Routers
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log("Server Started")
})
