const jwt = require("jsonwebtoken");
//THIS MIDDLEWARE WILL CHECK IF REQUEST HEADER HAS VALID JWT TOKEN.
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // we have to get text after 'Bearer'
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET); //verify that the token that is coming in header is valid and not expired.
    req.userData = decoded;
  } catch (error) {
    //if case of any errors e.g invalid, expire or missing token send back error response
    return res.status(401).json({
      message: "Authentication Faild. Make sure you are passing valid token.",
      //message:error.message,
      //status:error.status
    });
  }
  next();
};
