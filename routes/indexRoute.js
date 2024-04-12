const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const reminderController = require("../controllers/reminder_controller");

router.get("/", (req, res) => {
  res.redirect("/auth/login");
});

router.get("/reminder", ensureAuthenticated, reminderController.list);

//router.get("/reminders", reminderController.list);
router.get("/reminder/new", ensureAuthenticated, reminderController.new);
router.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
router.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);
router.post("/reminder/", ensureAuthenticated, reminderController.create);
// ⭐ Implement these two routes below!
router.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);
router.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

router.get("/admin", ensureAuthenticated, (req, res) => {
  
  req.sessionStore.all((err, sessions) => {
    if (err) {
      console.log(err);
      return res.redirect("/auth/login");
    }

    //console.log(sessions);

    let sessionList = [];
    for (let key in sessions) {
      if (req.user.id != sessions[key].passport.user) {
        sessionList.push({"SessionID":key, "UserID":sessions[key].passport.user})
      }
    }
    //console.log(sessionList);
    res.render("admin", { user: req.user, sessions: sessionList });
  });

});

router.get('/destroy/:sessionId', ensureAuthenticated, (req, res) => {
  const sessionId = req.params.sessionId;
  req.sessionStore.destroy(sessionId, (err) => {
    if (err) {
      console.log(err);
      return res.redirect('/admin');
    }
    res.redirect('/admin');
  });
});

module.exports = router;