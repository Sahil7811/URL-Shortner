// Importing necessary modules
const express = require("express"); // Express.js framework for building the server
require('dotenv').config();
const connectToMongoDB = require("./connect"); // Import the MongoDB connection function
const URL = require("./models/url"); // Import the URL model to interact with the database
const path = require("path"); // Path module for working with file and directory paths

const urlRoute = require("./routes/url"); // Import custom route handling for /url endpoint
const staticRoute = require("./routes/staticRouter"); // Import custom static route handler (e.g., for serving static assets)
const userRoute = require("./routes/user"); // Import route handling for user-related operations

const cookieParser = require("cookie-parser"); // Middleware to parse cookies from incoming requests
const { checkForAuthentication, restrictTo } = require("./middlewares/auth"); // Authentication and authorization middlewares

// Creating an instance of an Express app
const app = express(); // Initializes the express application, which serves as the backend

// Define the port on which the server will listen
const Port = process.env.PORT; // The server will listen on port 8001

// Connect to the MongoDB database
connectToMongoDB(process.env.MONGO_URI).then(() => {
  console.log(`MongoDB Connected!`); // Once the connection to MongoDB is successful, log this message
});

// Set EJS as the view engine for rendering dynamic HTML pages
app.set("view engine", "ejs"); // Tell Express to use EJS for rendering views
app.set("views", path.resolve("./views")); // Indicating the folder where the EJS files are located

// Middleware to parse incoming requests with JSON payloads
app.use(express.json()); // Allows the server to handle JSON data sent in requests
app.use(express.urlencoded({ extended: false })); // Allows the server to parse form data sent via POST requests
app.use(express.static(path.join(__dirname, "views"))); // Serve static files from the views directory
app.use(cookieParser()); // Middleware to parse cookies from client requests
app.use(checkForAuthentication); // Middleware to check authentication status for incoming requests

// Use the custom route handler for specific endpoints
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute); // Routes related to URL shortener logic will be handled by urlRoute
app.use("/user", userRoute); // Routes related to user management
app.use("/", staticRoute); // Use staticRoute for handling root or static file routes

// Route handler for redirecting to the full URL using a short URL identifier
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId; // Extract the short URL identifier from the request URL

  // Find the URL entry by shortId and update its visit history with the current timestamp
  const entry = await URL.findOneAndUpdate(
    {
      shortId, // Find the document that matches the provided shortId
    },
    {
      $push: {
        // The $push operator adds an item to an array field 
        visitHistory: {
          // Adding to the visitHistory array
          timestamp: Date.now(), // Store the current time of the visit
        },
      },
    }
  );

  // After updating the visit history, redirect the user to the original URL
  res.redirect(entry.redirectURL); // Redirect the user to the full URL stored in the database
});

// Start the Express server and listen on the defined port
app.listen(Port, () => {
  console.log(`Server Started at Port : ${Port}`); // Log when the server has successfully started and is listening on the specified port
});
