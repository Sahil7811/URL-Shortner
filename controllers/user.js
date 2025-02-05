const User = require("../models/user"); // Importing the User model to interact with the database
const { setUser } = require("../service/auth"); // Importing function to generate JWT token for authentication

// Function to handle user signup (registration)
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body; // Extract user input from request body

  // Ideally, validation should be added here (e.g., email format, password strength)
  await User.create({
    name,
    email,
    password, // Password should be hashed before storing (security improvement)
  });

  return res.redirect("/"); // Redirect user to the home page after successful registration
}

// Function to handle user login
async function handleUserLogin(req, res) {
  const { email, password } = req.body; // Extract user credentials from request body

  // Finding user in the database with the provided email and password
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Credentials", // Render login page with an error message if credentials are incorrect
    });

  // Generate a JWT token for the authenticated user
  const token = setUser(user);
  res.cookie("token", token); // Store the token in cookies for session management

  return res.redirect("/"); // Redirect user to the home page after successful login
}

// Exporting authentication functions for use in routes
module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
