const bcrypt = require("bcryptjs")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      // User authentication
      User.findOne({ email }).then((user) => {
        // User not found
        if (!user)
          return done(
            null,
            false,
            req.flash("error_messages", "User not found!")
          )

        // Password validation failed
        if (!bcrypt.compareSync(password, user.password))
          return done(
            null,
            false,
            req.flash("error_messages", "Invalid Password!")
          )

        // Pass Authentication
        return done(null, user)
      })
    }
  )
)

// Serialize and Deserialize
passport.serializeUser((user, done) => {
  return done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    return done(null, user)
  })
})

// Exports configuration
module.exports = passport
