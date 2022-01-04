const bcrypt = require("bcryptjs")

const User = require("../models/user")

module.exports = {
  // User sign in
  loginPage: (req, res) => {
    if (req.user) return res.redirect("/")
    return res.render("login", {
      style: "sign.css"
    })
  },

  // User login
  login: (req, res) => {
    return res.redirect("/")
  },

  // User sign up
  signupPage: (req, res) => {
    return res.render("signup", {
      style: "sign.css"
    })
  },

  // Create user
  postUser: (req, res) => {
    const { email, name, password, confirmPassword } = req.body
    // Check user uniqueness
    User.findOne({ email }).then((user) => {
      if (user) {
        req.flash("error_messages", "User already exist!")
        return res.redirect("/login")
      } else {
        if (password !== confirmPassword) {
          req.flash("error_messages", "Please confirm your password.")
          return res.redirect("/signup")
        }

        User.create({
          email,
          name,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        }).then(() => {
          req.flash("success_messages", "Account Created!")
          return res.redirect("/login")
        })
      }
    })
  },

  logout: (req, res) => {
    req.logout()
    return res.redirect("/login")
  }
}
