const db = require('../models/usersModel.js');

const userController = {};

// Middleware to get userInfo

userController.addArtist = (req, res, next) => {
  console.log(req.body)
  const clientId = req.body.clientId;
  const artistName = req.body.artistName;

  const text = `INSERT INTO artist (name)
                VALUES ("${artistName}");` 
  
  db
    .query(text)
    .then(result => {
      console.log('result in addArtist: ',result);
      res.locals.character = result.row;
      next();
    })
    .catch(err => next(err))
}

module.exports = userController;