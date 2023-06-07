const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.authenticate = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    console.log(decoded)
  } catch(err) {
    throw err;
  }
  };

