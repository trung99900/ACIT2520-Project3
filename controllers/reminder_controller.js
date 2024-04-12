let database = require("../database").Database;
let githubDatabase = require("../githubDatabase");

async function getImage(banner) {
  // Unsplash API
  const url = `https://api.unsplash.com/search/collections?page=1&query=${banner}&client_id=zkvw9k628OwqRmsBuDaupUsR6zeUhtwB4CfGM6pRa2U`
  const res = await fetch(url)
  const data = await res.json()
  return data.results[Math.floor(Math.random() * 10)].cover_photo.urls.regular
}

// async function main() {
//   const banner = await getImage("dog")
//   console.log(banner)
// }
// main()

let remindersController = {
  list: (req, res) => {
    if (req.session.profile === undefined) {
      res.render("reminder/index", 
      { 
        reminders: database[req.user.id-1].reminders, 
        user: req.user,
      });
    }
    else {
      res.render("reminder/index", 
      { 
        reminders: githubDatabase, 
        user: req.session.profile,
      });
    }
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    if (req.session.profile === undefined) {
      let searchResult = database[req.user.id-1].reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      if (searchResult != undefined) {
        res.render("reminder/single-reminder", { reminderItem: searchResult });
      } else {
        res.render("reminder/index", { reminders: database[req.user.id-1].reminders });
      }
    }
    else {
      let searchResult = githubDatabase.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      if (searchResult != undefined) {
        res.render("reminder/single-reminder", { reminderItem: searchResult });
      } else {
        res.render("reminder/index", { reminders: githubDatabase });
      }
    }
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  create: async (req, res) => {
    if (req.session.profile === undefined) {
      let reminder = {
        id: database[req.user.id-1].reminders.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        banner: await getImage(req.body.banner.toString()),
      };
      database[req.user.id-1].reminders.push(reminder);
    }
    else {
      let reminder = {
        id: githubDatabase.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        banner: await getImage(req.body.banner.toString()),
      };
      githubDatabase.push(reminder);
    }
    res.redirect("/reminder");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    if (req.session.profile === undefined) {
      let searchResult = database[req.user.id-1].reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      if (searchResult != undefined) {
        res.render("reminder/edit", { reminderItem: searchResult });
      } else {
        res.render("reminder/index", { reminders: database[req.user.id-1].reminders });
      }
    }
    else {
      let searchResult = githubDatabase.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      if (searchResult != undefined) {
        res.render("reminder/edit", { reminderItem: githubDatabase[reminderToFind-1] });
      } else {
        res.render("reminder/index", { reminders: githubDatabase });
      }
    }
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    const data = req.body;
    let searchResult = null;
    if (req.session.profile === undefined) {
      searchResult = database[req.user.id-1].reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      if (searchResult === undefined) {
        res.render("reminder/index", { reminders: database[req.user.id-1].reminders });
      }
    }
    else {
      searchResult = githubDatabase.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      if (searchResult === undefined) {
        res.render("reminder/index", { reminders: githubDatabase });
      }
    }
    searchResult.title = data.title;
    searchResult.description = data.description;
    searchResult.completed = (data.completed === "true")
    res.redirect("/reminder")
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let index = null;
    if (req.session.profile === undefined) {
      for (let i = 0; i < database[req.user.id-1].reminders.length; i++) {
        if (database[req.user.id-1].reminders[i].id == reminderToFind) {
          index = i;
          break;
        }
      }
      if (index === null) {
        return Error("Can't find reminder!")
      }
      database[req.user.id-1].reminders.splice(index, 1)
    }
    else {
      for (let i = 0; i < githubDatabase.length; i++) {
        if (githubDatabase[i].id == reminderToFind) {
          index = i;
          break;
        }
      }
      if (index === null) {
        return Error("Can't find reminder!")
      }
      githubDatabase.splice(index, 1)
    }
    res.redirect("/reminder")
  },
};

module.exports = remindersController;