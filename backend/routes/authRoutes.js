// Import the Express framework to create a router for authentication-related routes
const express = require('express'); // Require the 'express' module and assign it to the constant 'express'

// Import the authentication controller functions to handle register and login logic
const { registerUser, loginUser } = require('../controllers/authController'); // Destructure 'registerUser' and 'loginUser' from the '../controllers/authController' module

// Create a new router instance to define authentication routes
const router = express.Router(); // Call express.Router() to create a new router and assign it to the constant 'router'

// Define the POST /api/auth/register route for user registration
router.post('/register', registerUser); // Register a POST handler at the '/register' path that uses the 'registerUser' controller

// Define the POST /api/auth/login route for user login
router.post('/login', loginUser); // Register a POST handler at the '/login' path that uses the 'loginUser' controller

// Export the router so it can be mounted in the main Express application
module.exports = router; // Assign the 'router' instance to module.exports for use in other modules

