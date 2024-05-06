const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key_here'; // Replace with your secret key

function verifyToken(req, res, next) {
    console.log(req.headers);
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).send('Invalid or missing authorization header');
  }

  const token = authorizationHeader.split(' ')[1];
  console.log(token);
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).send('Invalid token');
    }

    // Token is valid, store the decoded token in the request for further use
    req.decodedToken = decoded;
    next(); // Call the next middleware or route handler
  });
}

module.exports = verifyToken;