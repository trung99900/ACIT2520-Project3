const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
let database = require("../database").Database;
let addUser = require("../database").addUser
let modifyUser = require("../database").modifyUser

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    if (req.user.role === "admin") {
      res.redirect("/admin");
    }
    else {
      res.redirect("/reminder");
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.send("Error logging out");
    }
  });
  res.redirect("/auth/login");
});

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/reminder');
  }
);

router.get("/register", forwardAuthenticated, (req, res) => res.render("register"));

router.post("/register", (req, res) => {
  const data = req.body;
  const id = database.length + 1;
  let newUser = {
    id: id,
    name: data.name,
    email: data.email,
    password: data.password,
    role: "user",
    reminders: []
  }
  addUser(newUser);
  // console.log(database);
  res.redirect("/auth/login");
});

router.get("/forgot", forwardAuthenticated, (req, res) => res.render("forgot"));

router.post("/forgot", (req, res) => {
  const data = req.body;
  const user = database.find(user => user.email === data.email);
  if (user) {
    modifyUser(data.email, data.password);
    res.redirect("/auth/login");
  } else {
    res.redirect("/auth/forgot");
  }
});

module.exports = router;