const mongoose = require("mongoose"); // Importing the mongoose library to interact with MongoDB

// Defining a Mongoose schema for the User model
const userSchema = new mongoose.Schema(
  {
    // Defining a field called 'name' to store the user's name
    name: {
      type: String, // Defines the type as a string
      required: true, // This field is mandatory
    },

    // Defining a field called 'email' to store the user's email address
    email: {
      type: String, // Defines the type as a string
      required: true, // This field is mandatory
      unique: true, // Ensures no two users have the same email
    },

    // Defining a field called 'role' to store the user's role (e.g., NORMAL, ADMIN)
    role: {
      type: String, // Defines the type as a string
      required: true, // This field is mandatory
      default: "NORMAL", // Default role is 'NORMAL' unless specified otherwise
    },

    // Defining a field called 'password' to store the user's password
    password: {
      type: String, // Defines the type as a string
      required: true, // This field is mandatory
    },
  },
  { timestamps: true } // Mongoose automatically adds 'createdAt' and 'updatedAt' timestamps
);

// Creating a Mongoose model named 'User' using the defined schema
const User = mongoose.model("user", userSchema);

module.exports = User; // Exporting the model so it can be used in other files
