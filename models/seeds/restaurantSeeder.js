const db = require("../../config/mongoose")
const Restaurant = require("../restaurant")
const User = require("../user")
const restaurants = require("../../restaurant.json").results

// Asynchronous callback function then wait for db to create the data
// Close the connection with db
db.once("open", async () => {
  // Add userId in to restaurant objects
  await User.find()
    .then((users) => {
      for (let i = 0; i < 6; i++) {
        if (i >= 3) {
          restaurants[i].userId = users[1]._id
        } else {
          restaurants[i].userId = users[0]._id
        }
      }
      return restaurants
    })

    // await Restaurant.create(restaurants)
    .then(async (restaurants) => {
      await Restaurant.create(restaurants)
    })
  db.close()
})
