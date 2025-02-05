// Importing the express module to use for creating the router
const express = require("express");
const { restrictTo } = require("../middlewares/auth"); // Middleware for role-based access control
const URL = require("../models/url"); // Importing the URL model to interact with the database

// Creating a new router instance from express
const router = express.Router();

// Route to fetch all URLs (Admin Only)
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  // Fetch all URLs from the database (Admin can view all shortened URLs)
  const allurls = await URL.find({});

  // Render the "home" view and pass all retrieved URLs
  return res.render("home", {
    urls: allurls,
  });
});

// Route to fetch URLs created by the logged-in user  
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    // Find all URLs created by the logged-in user (based on user ID)
    const allurls = await URL.find({ createdBy: req.user._id });

    // Render the "home" view and pass only the URLs created by the user
    return res.render("home", {
      urls: allurls, // Pass the user's URLs to the template
    });
  } catch (error) {
    // Log the error and send a 500 status response if an error occurs
    console.error("Error fetching URLs:", error);
    res.status(500).send("Server Error");
  }
});

// Route to render the signup page
router.get("/signup", (req, res) => {
  return res.render("signup"); // Render the signup page
});

// Route to render the login page
router.get("/login", (req, res) => {
  return res.render("login"); // Render the login page
});

// Exporting the router so it can be used in other parts of the app (such as app.js or server.js)
module.exports = router;
