Breakdown of work:

Ghiervis Tuazon:
- I added three middleware functions: ensureAuthenticated, ensureOwnership, and isAdmin, to handle authentication, ownership verification, and admin authorization respectively.
- I modified the reminder routes to include these middlewares to enforce authentication, ownership checks, and admin authorization.
- I added a /logout route to handle user logout.
- I added an /admin/destroy-session/:sessionId route to allow admins to remotely destroy sessions, and added the isAdmin middleware to restrict access to admins only.

Trung Nguyen:
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
