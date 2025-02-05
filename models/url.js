const mongoose = require("mongoose"); // Importing the mongoose library, which allows interaction with MongoDB

// Defining a Mongoose schema for the URL model
const urlSchema = new mongoose.Schema(
  {
    // Defining a field called 'shortId' which will store the shortened URL identifier
    shortId: {
      type: String, // Defines the type as a string
      required: true, // This field is required
      unique: true, // This field must have a unique value across all documents
    },

    // Defining a field called 'redirectURL' which stores the original URL
    redirectURL: {
      type: String, // Defines the type as a string
      required: true, // This field is required
    },

    // Defining a field called 'visitHistory', which is an array that stores timestamps of each visit
    visitHistory: [
      {
        timestamp: { type: Number }, // Each visit is represented by a number (timestamp)
      },
    ],

    // Defining a field called 'createdBy' which stores the ID of the user who created the short URL
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // Stores the ObjectId of the user from the 'users' collection
      ref: "users", // References the 'users' collection
    },
  },
  { timestamps: true } // Mongoose will automatically add 'createdAt' and 'updatedAt' fields
);

const URL = mongoose.model("url", urlSchema); // Creating the URL model based on the schema, which will be used to interact with the "url" collection in MongoDB

module.exports = URL; // Exporting the model so it can be used in other files
