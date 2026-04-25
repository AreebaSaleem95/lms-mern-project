// Define middleware to restrict access to routes based on user roles (e.g., admin, instructor, student)
const authorizeRoles = (...allowedRoles) => { // Declare a higher-order function 'authorizeRoles' that accepts a variable number of allowed role strings
  // Return the actual middleware function that Express will call for each request
  return (req, res, next) => { // Return a middleware function that receives req, res, and next
    // Check if the authenticated user object exists on the request (set by the 'protect' middleware)
    if (!req.user) { // If req.user is not defined, the user is not authenticated
      // Return a 401 Unauthorized response because only authenticated users can be role-checked
      return res.status(401).json({ message: 'Not authorized, user not authenticated' }); // Send a JSON error message to the client
    } // End of condition checking for missing req.user

    // Check if the authenticated user's role is included in the list of allowed roles
    if (!allowedRoles.includes(req.user.role)) { // Use Array.includes to see if req.user.role is one of the allowedRoles
      // Return a 403 Forbidden response because the user does not have the required role
      return res.status(403).json({ message: 'Forbidden, insufficient role permission' }); // Send a JSON error message to the client
    } // End of condition checking for unauthorized user role

    // If the user's role is allowed, call next() to hand control to the next middleware or route handler
    next(); // Proceed to the next middleware or route handler in the stack
  }; // End of the inner middleware function definition
}; // End of 'authorizeRoles' higher-order function definition

// Export the authorizeRoles middleware factory so routes can apply fine-grained role-based authorization
module.exports = { authorizeRoles }; // Assign an object containing 'authorizeRoles' to module.exports

