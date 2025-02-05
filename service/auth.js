const jwt = require("jsonwebtoken"); // Importing the JSON Web Token (JWT) library for authentication
require("dotenv").config();
const secret = process.env.secret; // Secret key used for signing and verifying JWTs (Should be a strong, secure key in production)

// Function to generate a JWT token for a user
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id, // Embedding user ID in the token payload
      email: user.email, // Embedding user email in the token payload
      role: user.role, // Embedding user role in the token payload
    },
    secret // Signing the token using the secret key
  );
}

// Function to verify and extract user details from a JWT token
function getUser(token) {
  if (!token) {
    return null; // Return null if no token is provided
  }

  try {
    return jwt.verify(token, secret); // Verify and decode the token
  } catch (err) {
    return null; // Return null if token verification fails (e.g., invalid or expired token)
  }
}

module.exports = { setUser, getUser }; // Exporting the functions for use in other parts of the application
