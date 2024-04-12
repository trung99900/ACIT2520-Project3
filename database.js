let Database = [
  {
    id: 1,
    name: "Cindy Armstrong",
    email: "cindy123@gmail.com",
    password: "cindy123!",
    role: "user",
    reminders: [
      {
        id: 1,
        title: "Watch movie ",
        description: "Dune 2",
        completed: false,
        banner: "https://www.thespiral.co.uk/wp-content/uploads/2023/02/dunehero.jpg"
      },
    ],
  },
  {
    id: 2,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user",
    reminders: []
  },
  {
    id: 3,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
    reminders: []
  },
  {
    id: 4,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
    reminders: []
  },
  {
    id: 5,
    name: "THE MR. ADMINISTRATOR",
    email: "admin@gmail.com",
    password: "admin123!",
    role: "admin"
  }
];

function addUser(newUser) {
  Database.push(newUser);
}

function modifyUser(email, newPassword) {
  const user = Database.find(user => user.email === email);
  if (user) {
    user.password = newPassword;
  }
}

module.exports = {Database, addUser, modifyUser};
