const shortid = require("shortid"); // Import the shortid library to generate unique short IDs for the URLs

// Import the URL model which interacts with the database
const URL = require("../models/url"); // Database model import for URL collection

// Async function to handle generating a new short URL
async function handlegenerateNewShortUrl(req, res) {
  const body = req.body; // Get the body of the request
  if (!body.url) return res.status(400).json({ error: "url is required" }); // Check if the URL is provided in the request body

  const shortID = shortid(); // Generate a unique short ID for the URL
  // Create a new record in the URL model (database)
  await URL.create({
    shortId: shortID, // The unique short ID
    redirectURL: body.url, // The original URL the short URL will redirect to
    visitedHistory: [], // Initialize an empty array for tracking visit history
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortID }); // Send the generated short ID as a response
}

// Async function to handle fetching analytics for a short URL
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId; // Extract the short ID from the request parameters
  const result = await URL.findOne({ shortId }); // Find the record in the database with the provided short ID

  return res.json({
    totalClicks: result.visitHistory.length, // Return the total number of clicks (based on the length of visitHistory)
    analytics: result.visitHistory, // Return the visit history for the short URL
  });
}

// Export the functions to be used in other parts of the application
module.exports = {
  handlegenerateNewShortUrl,
  handleGetAnalytics,
};
