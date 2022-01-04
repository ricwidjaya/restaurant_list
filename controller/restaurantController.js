const Restaurant = require("../models/restaurant")

const restaurantController = {
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
    return Restaurant.findById(id)
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
  }
}
module.exports = restaurantController
