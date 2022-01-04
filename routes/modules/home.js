const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")

const Restaurant = require("../../models/restaurant")
const User = require("../../models/user")

const { authenticated } = require("../../controllers/auth")

// User sign in
router.get("/login", (req, res) => {
  if (req.user) return res.redirect("/")
  return res.render("login", {
    style: "sign.css"
  })
})

// User login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
)

// User sign up
router.get("/signup", (req, res) => {
  return res.render("signup", {
    style: "sign.css"
  })
})

// Create user
router.post("/signup", (req, res) => {
  const { email, name, password, confirmPassword } = req.body
  // Check user uniqueness
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log("User already exist!")
      return res.redirect("/login")
    } else {
      if (password !== confirmPassword) return res.redirect("back")

      User.create({
        email,
        name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      }).then(() => {
        return res.redirect("/login")
      })
    }
  })
})

router.get("/logout", (req, res) => {
  req.logout()
  console.log(req.user)
  return res.redirect("/login")
})

router.get("/", authenticated, (req, res) => {
  const keyword = req.query.keyword
  const sortMethod = req.query.sort
  let { where, sortOpt } = queryParams(keyword, sortMethod)

  // Regular index page
  Restaurant.find(where)
    .lean()
    .sort(sortOpt)
    .then((restaurants) => {
      // Change MongoDB ObjectId into string
      restaurants.forEach((restaurant) => {
        restaurant._id = restaurant._id.toString()
      })
      return restaurants
    })
    .then((restaurants) => {
      res.render("index", {
        style: "index.css",
        script: "index.js",
        restaurant: restaurants
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

// Live Search API
router.get("/search", authenticated, (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  let { where, sortOpt } = queryParams(keyword)
  Restaurant.find(where)
    .lean()
    .sort(sortOpt)
    .then((restaurants) => {
      res.json(restaurants)
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router

function queryParams(keyword, sortMethod) {
  // Define sort methods
  const sort = {
    0: { name: 1 },
    1: { name: -1 },
    category: { category: 1 }
  }

  // If sortMethod is not defined, default sort will be "name"
  let sortOpt = sort[sortMethod] || { _id: "desc" }

  // Search keyword from DB with regex
  let where = keyword
    ? {
        $or: [
          { name: new RegExp(keyword, "i") },
          { category: new RegExp(keyword, "i") }
        ]
      }
    : {}

  return { where, sortOpt }
}
