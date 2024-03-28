let database = require("../database");

//Change lines so that Cindy is not hardcoded 
let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => { 
    // implementation here 👈
    let index = database.cindy.reminders.findIndex(reminder => reminder.id == req.params.id);
    database.cindy.reminders[index].title = req.body.title;
    database.cindy.reminders[index].description = req.body.description;
    database.cindy.reminders[index].completed = req.body.completed === "true" ? true : false;
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // implementation here 👈
    const index = database.cindy.reminders.findIndex(reminder => reminder.id == req.params.id);
    const reminderToDelete = database.cindy.reminders[index];
    if (reminderToDelete) {
      database.cindy.reminders.splice(index, 1);
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
