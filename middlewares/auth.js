const { getUser } = require("../service/auth"); // Importing the function to decode and verify JWT tokens

// Middleware for Authentication: Checks if the user is logged in
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token; // Extract the token from cookies
  req.user = null; // Initialize user as null (default)

  if (!tokenCookie) return next(); // If no token is found, move to the next middleware

  const token = tokenCookie; // Assign token value
  const user = getUser(token); // Decode and verify the token to extract user details
  req.user = user; // Attach user data to the request object

  next(); // Proceed to the next middleware or route handler
}

// Middleware for Authorization: Restricts access based on user roles
// Roles can be "ADMIN" or "NORMAL"
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login"); // If the user is not logged in, redirect to login page
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized"); // If user role is not allowed, deny access
    return next(); // If authorized, proceed to the next middleware or route handler
  };
}

// Exporting the authentication and authorization functions for use in other parts of the application
module.exports = {
  checkForAuthentication,
  restrictTo,
};
