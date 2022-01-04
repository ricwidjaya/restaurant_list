const express = require("express")
const router = express.Router()

const { authenticated } = require("../controllers/auth")

const home = require("./modules/home")
const restaurants = require("./modules/restaurants")

router.use("/", home)
router.use("/restaurants", authenticated, restaurants)

module.exports = router
