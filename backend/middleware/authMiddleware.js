// Import the 'jsonwebtoken' library to verify and decode JSON Web Tokens for authentication
const jwt = require('jsonwebtoken'); // Require the 'jsonwebtoken' module and assign it to the constant 'jwt'

// Import the User model to fetch user information from the database based on the token payload
const User = require('../models/User'); // Require the '../models/User' module and assign it to the constant 'User'

// Define middleware to protect routes by requiring a valid JWT token
const protect = async (req, res, next) => { // Declare an async middleware function named 'protect' with req, res, and next parameters
  // Initialize a variable to hold the token extracted from the request headers
  let token; // Declare the variable 'token' without assigning an initial value

  // Check if the Authorization header exists and starts with the 'Bearer' scheme
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // Verify that the authorization header is present and correctly formatted
    // Split the 'Bearer tokenValue' string and take the token part (index 1 of the array)
    token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header after the 'Bearer' keyword
  } // End of condition checking for Bearer token in the header

  // If no token was found in the Authorization header, respond with an unauthorized error
  if (!token) { // Check if the 'token' variable is falsy (null, undefined, or empty)
    // Return a 401 Unauthorized response indicating that a token is required
    return res.status(401).json({ message: 'Not authorized, token missing' }); // Send a JSON error message to the client
  } // End of condition checking for missing token

  try { // Start a try block to attempt token verification and user retrieval
    // Verify the token using the secret key stored in the environment variable JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use jwt.verify to decode and validate the token, assigning the result to 'decoded'

    // Find the user associated with the decoded token's id, excluding the password field from the returned document
    req.user = await User.findById(decoded.id).select('-password'); // Query the database for the user by ID and attach it to req.user without the password

    // If no user document is found for the decoded token, respond with an unauthorized error
    if (!req.user) { // Check whether req.user is falsy, indicating the user was not found
      // Return a 401 Unauthorized response indicating the user no longer exists
      return res.status(401).json({ message: 'Not authorized, user not found' }); // Send a JSON error message to the client
    } // End of condition checking for missing user

    // If everything is valid, call next() to hand control to the next middleware or route handler
    next(); // Proceed to the next middleware function in the request-response cycle
  } catch (error) { // Catch block to handle any errors thrown during token verification or user retrieval
    // Log the error message to the server console for debugging purposes
    console.error('Auth middleware error:', error.message); // Output the error message indicating an authentication issue
    // Return a 401 Unauthorized response indicating that the token is invalid
    return res.status(401).json({ message: 'Not authorized, token invalid' }); // Send a JSON error message to the client
  } // End of try-catch block for token verification
}; // End of 'protect' middleware function definition

// Export the protect middleware so it can be used to secure protected routes
module.exports = { protect }; // Assign an object containing the 'protect' middleware to module.exports

