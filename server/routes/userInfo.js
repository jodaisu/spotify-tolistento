const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

// ADD GET USER INFO ROUTE HANDLER HERE
router.get('/', userController.getUserInfo, (req, res, next) => {
  res.status(200).send('hello')
});

module.exports = router;