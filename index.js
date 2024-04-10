// This is the second test - Trung
const passport = require("./middleware/passport");
const session = require("express-session");
const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const userController = require('./controller/userController');

// Middleware to check if user is authenticated - Ghiervis Tuazon
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

// Middleware to check if user owns the reminder - Ghiervis Tuazon
function ensureOwnership(req, res, next) {
  const reminderId = req.params.id;
  const userId = req.user.id; 
}

// Middleware to check if user is an admin - Ghiervis Tuazon
function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    res.sendStatus(403);
  }
}

//TEST EDUARDO
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(session({ 
  secret: "123456cat",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes start here

app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// 👌 Ignore for now
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

// Logout route - Ghiervis Tuazon
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/login");
});

// Admin route to destroy session - Ghiervis Tuazon
app.post("/admin/destroy-session/:sessionId", isAdmin, function(req, res) { // Added isAdmin middleware
  const sessionId = req.params.sessionId;
  // Implement logic to check if user is admin
  if (req.user.isAdmin) {
    // Destroy session
    req.sessionStore.destroy(sessionId, function(err) {
      if (err) {
        console.error("Error destroying session:", err);
        res.sendStatus(500);
      } else {
        console.log("Session destroyed successfully");
        res.sendStatus(200);
      }
    });
  } else {
    res.sendStatus(403);
  }
});


app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
