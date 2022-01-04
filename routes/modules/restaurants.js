const express = require("express")
const router = express.Router()

const { authenticated } = require("../../controllers/auth")
const restaurantController = require("../../controllers/restaurantController")

// Restaurant create page
router.get("/create", restaurantController.create)

// View restaurant info
router.get("/:id", restaurantController.getRestaurant)

// Create restaurant
router.post("/", restaurantController.postRestaurant)

// Edit restaurant page
router.get("/:id/edit", restaurantController.editRestaurant)

// Update restaurant
router.put("/:id", restaurantController.putRestaurant)

// Delete restaurant
router.delete("/:id", restaurantController.deleteRestaurant)

module.exports = router
