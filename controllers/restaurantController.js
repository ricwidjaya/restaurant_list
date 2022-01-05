const Restaurant = require("../models/restaurant")

module.exports = {
  // Restaurant create page
  create: (req, res) => {
    return res.render("create", {
      style: "create.css",
      script: "create.js"
    })
  },

  // View restaurant info
  getRestaurant: (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    return Restaurant.findOne({ id, userId })
      .lean()
      .then((restaurant) => {
        res.render("show", {
          style: "show.css",
          script: "show.js",
          restaurant,
          id,
          GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Create restaurant
  postRestaurant: (req, res) => {
    const restaurant = req.body
    Restaurant.create(restaurant)
    return res.redirect("/")
  },

  // Edit restaurant page
  editRestaurant: (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .lean()
      .then((restaurant) => {
        res.render("edit", {
          style: "create.css",
          script: "edit.js",
          restaurant,
          id
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },

  // Update restaurant
  putRestaurant: (req, res) => {
    const id = req.params.id
    const restaurant = req.body
    return Restaurant.findByIdAndUpdate(id, restaurant)
      .then(res.redirect(`/restaurants/${id}`))
      .catch((error) => {
        console.log(error)
      })
  },

  // Delete restaurant
  deleteRestaurant: (req, res) => {
    const id = req.params.id
    return Restaurant.findByIdAndDelete(id)
      .then(res.redirect("/"))
      .catch((error) => {
        console.log(error)
      })
  },

  // Render all restaurants
  getRestaurants: (req, res) => {
    const keyword = req.query.keyword
    const sortMethod = req.query.sort
    let { where, sortOpt } = queryParams(req, keyword, sortMethod)

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
    let { where, sortOpt } = queryParams(req, keyword)
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

function queryParams(req, keyword, sortMethod) {
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
        ],
        userId: req.user._id
      }
    : { userId: req.user._id }

  return { where, sortOpt }
}
