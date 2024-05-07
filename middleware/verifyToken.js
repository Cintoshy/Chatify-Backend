const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const tokenCookie = req.headers.cookie; // Get the cookie header
  // Check if token is provided
  if (!tokenCookie) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  // Split the cookie string by ';' to get individual cookies
  const cookies = tokenCookie.split(";");

  // Find the cookie containing the JWT token

  const jwtCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("jwtToken=")
  );

  // Extract the token value from the cookie
  if (!jwtCookie) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
  const tokenValue = jwtCookie.split("=")[1].trim();

  try {
    // Verify the token

    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    // Attach the decoded token payload to the request object for further use
    req.user = decoded;
    // Move to the next middleware
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
