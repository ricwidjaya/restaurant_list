const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")

router.get("/", (req, res) => {
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
router.get("/search", (req, res) => {
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
