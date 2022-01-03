const mongoose = require("mongoose")

// Connect to mongoDB
mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on("error", () => {
  console.log("Failed to Connect MongoDB")
})

db.once("open", () => {
  console.log("MongoDB Connected!")
})

module.exports = db
