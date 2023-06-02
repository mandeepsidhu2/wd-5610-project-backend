const {OAuth2Client} = require('google-auth-library');
const jwt = require("jsonwebtoken");
require('dotenv').config()
const userService = require("../services/userService")
exports.loginUser = async ({token}) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token
    });
    const payload = ticket.getPayload();
    console.log(payload)
    await userService.createUser({name:payload.name,email:payload.email,id:payload.sub,image_url:payload.picture})
    const jwtToken = jwt.sign(
        { user_id: payload.sub, email: payload.email ,name:payload.name},
        process.env.JWT_TOKEN_KEY,
        {
          expiresIn: "96h",
        }
      );
    return jwtToken
   
  };