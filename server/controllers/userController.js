const request = require('request') // request library

const userController = {};

// Middleware to get userInfo

userController.getUserInfo = (req, res, next) => {
  return next();
}

