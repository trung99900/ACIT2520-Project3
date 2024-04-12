# Fully Functional Reminder App

## Requirement
Create a `.env` file inside `models` folder \
Save your GitHub id and GitHub secret by this template 
```
GITHUB_CLIENT_ID="Your ID"
GITHUB_CLIENT_SECRET="Your Secret"
```

## Breakdown of work:

### Ghiervis Tuazon:
- I added three middleware functions: ensureAuthenticated, ensureOwnership, and isAdmin, to handle authentication, ownership verification, and admin authorization respectively.
- I modified the reminder routes to include these middlewares to enforce authentication, ownership checks, and admin authorization.
- I added a /logout route to handle user logout.
- I added an /admin/destroy-session/:sessionId route to allow admins to remotely destroy sessions, and added the isAdmin middleware to restrict access to admins only.

### Trung Nguyen:
- I worked on the following tasks:
1. Watched 3 Videos (Part1,2,3).
2. Created a public Github repository and pushed the starter code to Github, invited members  - This task is responsible for creating group for Team Project Assignment.
3. Downloaded the starter code from learning hub
4. Integrated Passport Authentication (used the passport.js starter code provided by teacher in learning hub) into our project. - This task is responsible User Authentication functionality.
5. Modified the Passport Authentication function to be able to show the reminders of the logged in user, not Cindy
6. Updated our database structure to include a userId
7. Updated the reminderController methods to filter reminders based on the userId. We can access the logged-in user's ID through req.user.id by using passport for authentication
8. Updated the authController to include login functionality.
9. Created a new route that accepts a userId parameterFor for the admin to remotely destroy a session. 

### Eduardo:
- I worked on the following tasks:
1. Added update and delete functions in reminder_controller. Remember to change them when changing the code to use a login method!

### Tuan Nguyen:
#### 4/2/2024
- Rewatch passport lecture \
*Note: Question*
**server.js**
```
app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});
```
These code will run again and again anytime we login or ...
Dose it mean the server.js will run repeatly? \
-> No
That is the request-respond cycle. The entire server.js file isnt running repeatedly, just this middleware function.

#### 4/3/2024 
- Finish the Authentication Lab (GitHub + Admin)

#### 4/4/2024 
- Watch 3 videos about TermProject
- Imication splement the delete and edit button
- Try intergrating authentication
- Found an error about lib version and successfully fixed it
- Integrating authentucessfully

#### 5/4/2024 
- Re-format the database
- Make the navbar only be displayed on reminders (and related) pages
- Rename /reminders to /reminder and make /reminder can't by accessed unless signin
- Delete /dashboard route and dashboard.ejs, replace it by /reminder and index.ejs 
- Make the reminderController dynamicly show user's reminder (Not only hardcode for Cindy only)
- Re-format the profile user who login by GitHub and code a complete seperated case for GitHub user
- Completely coding the part of users must login in order to view (edit, add, delete) their reminders
- Problem: If user loggins by GitHub and logouts, user's reminders will be clear -> Need to find a way to save without push it into database which saving data of local users
- Because there is only 1 GitHub user -> create a small database for GitHub user only and when user does login, server will look at that small database, if there are some records, use that data, if not, create new.
- Make that idea works

#### 11/4/2024
- Get the banner image task done.
- Successfully add the register function
- Successfully add the reset password function
- Fix logout bug