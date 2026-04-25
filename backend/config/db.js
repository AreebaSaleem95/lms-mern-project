// Import the 'mongoose' library to interact with a MongoDB database using an ODM (Object Data Modeling) approach
const mongoose = require('mongoose'); // Require the 'mongoose' module and assign it to the constant 'mongoose'

// Import the 'dotenv' package to ensure environment variables are loaded when this file is used directly (extra safety)
const dotenv = require('dotenv'); // Require the 'dotenv' module and assign it to the constant 'dotenv'

// Call dotenv.config() to load environment variables from a .env file into process.env, if not already loaded
dotenv.config(); // Initialize dotenv so we can access environment variables like MONGO_URI

// Define an asynchronous function responsible for connecting to the MongoDB database
const connectDB = async () => { // Declare an async arrow function named 'connectDB' with no parameters
  try { // Start a try block to handle any errors that occur during the database connection process
    // Use mongoose.connect to establish a connection to the MongoDB instance using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI); // Await the mongoose.connect promise using the MONGO_URI value from process.env

    // Log a success message that includes the host of the connected MongoDB instance
    console.log(`MongoDB Connected: ${conn.connection.host}`); // Output a console message indicating successful connection with the host name
  } catch (error) { // Catch block to handle any errors thrown during the connection attempt
    // Log an error message to help with debugging connection issues
    console.error('MongoDB connection error:', error.message); // Output the error message to the console for troubleshooting
    // Exit the Node.js process with a failure code so the environment (e.g., PM2, Docker) can react accordingly
    process.exit(1); // Terminate the current process with a non-zero exit code to indicate failure
  } // End of try-catch block for database connection
}; // End of 'connectDB' function declaration

// Export the connectDB function so it can be imported and used in other parts of the backend (e.g., server.js)
module.exports = connectDB; // Assign the 'connectDB' function to module.exports to make it available to other modules

