const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
var { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");
const app = express();
app.use(cors());
const { config } = require("./config");
const { audience, issuerBaseURL } = config;

//& this is one way to do the jwt verification
const jwtCheck = auth({
  audience: audience,
  issuerBaseURL: issuerBaseURL,
  tokenSigningAlg: "RS256",
});
//& this is another of the way to do the jwt verification

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuerBaseURL}.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: issuerBaseURL,
  algorithms: ["RS256"],
});

// app.use(verifyJwt); //! once i do this or put it in between the function and the route ("middleware") i get 401 unauthorized

//& everything works when i don't use the verification but once i do i get this error : "InvalidTokenError: Invalid Compact JWS"

app.get("/", (req, res) => {
  res.send("hello from index");
});

app.get("/protected", async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log(req.headers.authorization);
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      res.status(401).send("Invalid or missing authorization header");
      return;
    }

    const accessToken = authorizationHeader.split(" ")[1];
    console.log(accessToken);
    const response = await axios.get(
      "https://dev-zwitco1mhbvpdqcv.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userInfo = response.data;
    console.log(userInfo);
    res.send(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.listen(1011, () => {
  console.log("server is running on port 1011");
});
