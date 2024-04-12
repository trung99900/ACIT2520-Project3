const express = require("express");
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controllers/reminder_controller");

// NEW
const session = require("express-session");
// END NEW

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(ejsLayouts);

// NEW
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoute);
app.use("/auth", authRoute);
// END NEW


// app.get("/reminders", reminderController.list);
// app.get("/reminder/new", reminderController.new);
// app.get("/reminder/:id", reminderController.listOne);
// app.get("/reminder/:id/edit", reminderController.edit);
// app.post("/reminder/", reminderController.create);

// app.post("/reminder/update/:id", reminderController.update);
// app.post("/reminder/delete/:id", reminderController.delete);

app.listen(8000, function () {
  console.log(
    "🚀 Server has started on port 8000 ..."
  );
});
