const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();



router.post('/addArtist', userController.addArtist, (req, res) => {
  console.log(req.body);
  res.status(200)
});

module.exports = router;