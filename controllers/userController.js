const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")

const Restaurant = require("../models/restaurant")
const User = require("../models/user")

const { authenticated } = require("./auth")

module.exports = {
  // User sign in
  loginPage: (req, res) => {
    if (req.user) return res.redirect("/")
    return res.render("login", {
      style: "sign.css"
    })
  },

  // User login
  login: (req, res) => {
    return res.redirect("/")
  },

  // User sign up
  signupPage: (req, res) => {
    return res.render("signup", {
      style: "sign.css"
    })
  },

  // Create user
  postUser: (req, res) => {
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
  },

  logout: (req, res) => {
    req.logout()
    return res.redirect("/login")
  },

  getRestaurants: (req, res) => {
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
  },

  // Live Search API
  search: (req, res) => {
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
  }
}

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
