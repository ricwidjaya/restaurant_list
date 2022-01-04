const bcrypt = require("bcryptjs")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const User = require("../models/user")

// Local strategy
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

// Facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["displayName", "photos", "email"]
    },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      User.findOne({ email }).then((user) => {
        // User exist
        if (user) {
          return done(null, user)
        }
        // New user
        const randomPassword = Math.random().toString(36).slice(-8)
        User.create({
          name,
          email,
          password: bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10))
        })
          .then((user) => {
            return done(null, user)
          })
          .catch((err) => {
            done(err, false)
          })
      })
    }
  )
)

// Serialize and Deserialize
passport.serializeUser((user, done) => {
  return done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .lean()
    .then((user) => {
      return done(null, user)
    })
})

// Exports configuration
module.exports = passport
