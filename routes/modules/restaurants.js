const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/restaurant")

// Restaurant create page
router.get("/create", (req, res) => {
  res.render("create", {
    style: "create.css",
    script: "create.js"
  })
})

// View restaurant info
router.get("/:id", (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
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
})

// Create restaurant
router.post("/", (req, res) => {
  const restaurant = req.body
  Restaurant.create(restaurant)
  res.redirect("/")
})

// Edit restaurant page
router.get("/:id/edit", (req, res) => {
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
})

// Update restaurant
router.put("/:id", (req, res) => {
  const id = req.params.id
  const restaurant = req.body
  return Restaurant.findByIdAndUpdate(id, restaurant)
    .then(res.redirect(`/restaurants/${id}`))
    .catch((error) => {
      console.log(error)
    })
})

// Delete restaurant
router.delete("/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndDelete(id)
    .then(res.redirect("/"))
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router
