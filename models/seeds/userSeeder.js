const db = require("../../config/mongoose")
const User = require("../user")
const bcrypt = require("bcryptjs")

const users = [
  {
    email: "user1@example.com",
    password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10))
  },
  {
    email: "user2@example.com",
    password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10))
  }
]

// Asynchronous callback function then wait for db to create the data
// Close the connection with db
db.once("open", async () => {
  await User.create(users)
  db.close()
})
