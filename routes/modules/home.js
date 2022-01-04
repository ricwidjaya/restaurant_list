const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")

const Restaurant = require("../../models/restaurant")
const User = require("../../models/user")

const { authenticated } = require("../../controllers/auth")
const userController = require("../../controllers/userController")

// User sign in
router.get("/login", userController.loginPage)

// User login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login"
  }),
  userController.login
)

// User sign up
router.get("/signup", userController.signupPage)

// Create user
router.post("/signup", userController.postUser)

router.get("/logout", userController.logout)

router.get("/", authenticated, userController.getRestaurants)

// Live Search API
router.get("/search", authenticated, userController.search)

module.exports = router
