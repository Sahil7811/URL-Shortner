const express = require("express"); // Importing the express module to create a router
const router = express.Router(); // Creating a new router instance

// Importing controller functions for handling user authentication
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");

// Route for user signup (registration)
router.post("/", handleUserSignUp); // Calls the `handleUserSignUp` function when a POST request is made to "/"

// Route for user login
router.post("/login", handleUserLogin); // Calls the `handleUserLogin` function when a POST request is made to "/login"

// Exporting the router to be used in other parts of the application
module.exports = router;
