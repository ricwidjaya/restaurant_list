const express = require("express")
const router = express.Router()
const passport = require("passport")

const { authenticated } = require("../../controllers/auth")
const userController = require("../../controllers/userController")
const restaurantController = require("../../controllers/restaurantController")

// User sign in
router.get("/login", userController.loginPage)

// User login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  userController.login
)

// User sign up
router.get("/signup", userController.signupPage)

// Create user
router.post("/signup", userController.postUser)
router.get("/logout", userController.logout)
router.get("/", authenticated, restaurantController.getRestaurants)

// Live Search API
router.get("/search", authenticated, restaurantController.search)

module.exports = router
