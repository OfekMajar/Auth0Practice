const dotenv = require("dotenv");

dotenv.config();

const { audience } = process.env;
const { issuerBaseURL } = process.env;

const config = {
  audience,
  issuerBaseURL,
};

module.exports = { config };
