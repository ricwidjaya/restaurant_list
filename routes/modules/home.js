const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")

router.get("/", (req, res) => {
  const sortAToZ = req.query.sort
  if (sortAToZ === "0") {
    return Restaurant.find()
      .lean()
      .collation({ locale: "en_US", strength: 1 })
      .sort({ name: 1 })
      .then((restaurants) => {
        res.render("index", {
          style: "index.css",
          script: "index.js",
          restaurant: restaurants
        })
      })
  }
  if (sortAToZ === "1") {
    return Restaurant.find()
      .lean()
      .collation({ locale: "en_US", strength: 1 })
      .sort({ name: -1 })
      .then((restaurants) => {
        res.render("index", {
          style: "index.css",
          script: "index.js",
          restaurant: restaurants
        })
      })
  }

  // By category
  if (sortAToZ === "category") {
    return Restaurant.find()
      .lean()
      .collation({ locale: "zh_Hant", strength: 1 })
      .sort({ category: 1 })
      .then((restaurants) => {
        res.render("index", {
          style: "index.css",
          script: "index.js",
          restaurant: restaurants
        })
      })
  }

  // Regular index page
  Restaurant.find()
    .lean()
    .sort({ _id: "desc" }) // new restaurant shows first
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
router.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLowerCase()

  // Search keyword from DB with regex
  Restaurant.find({
    $or: [
      { name: new RegExp(keyword, "i") },
      { category: new RegExp(keyword, "i") }
    ]
  })
    .lean()
    .then((restaurants) => {
      res.json(restaurants)
    })
})

module.exports = router
