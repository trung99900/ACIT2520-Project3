Breakdown of work:

Ghiervis Tuazon:
- I added three middleware functions: ensureAuthenticated, ensureOwnership, and isAdmin, to handle authentication, ownership verification, and admin authorization respectively.
- I modified the reminder routes to include these middlewares to enforce authentication, ownership checks, and admin authorization.
- I added a /logout route to handle user logout.
- I added an /admin/destroy-session/:sessionId route to allow admins to remotely destroy sessions, and added the isAdmin middleware to restrict access to admins only.