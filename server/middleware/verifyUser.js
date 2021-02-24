const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyUser = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      if (jwt.verify(req.headers.authorization, JWT_SECRET)) {
        res.locals.isUserLoggedIn = true;
      } else {
        res.locals.isUserLoggedIn = false;
      }
    } else if (req.body.token) {
      if (jwt.verify(req.body.token, JWT_SECRET)) {
        res.locals.isUserLoggedIn = true;
      } else {
        res.locals.isUserLoggedIn = false;
      }
    } else {
      res.locals.isUserLoggedIn = false;
    }
  } catch(err) {
    res.locals.isUserLoggedIn = false
    next();
  }
  next();
}

module.exports = verifyUser;