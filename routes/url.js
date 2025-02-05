const express = require("express"); // Import the express library to create the router for defining routes

const router = express.Router(); // Create a new router instance using express.Router()

// Import the functions for handling routes from the controllers
const {
  handlegenerateNewShortUrl,
  handleGetAnalytics,
} = require("../controllers/url");

// Define the route to handle creating a new short URL
router.post("/", handlegenerateNewShortUrl); // POST request to the root URL ("/") will trigger the handlegenerateNewShortUrl function

// Define the route to handle retrieving analytics for a short URL
router.get("/analytics/:shortId", handleGetAnalytics); // GET request to "/analytics/:shortId" will trigger the handleGetAnalytics function, ":shortId" is a route parameter that will be replaced with an actual short ID

// Export the router so it can be used in the main application file
module.exports = router;
