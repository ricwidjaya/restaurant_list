const mongoose = require("mongoose")
require("dotenv").config()

// Connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on("error", () => {
  console.log("Failed to Connect MongoDB")
})

db.once("open", () => {
  console.log("MongoDB Connected!")
})

module.exports = db
