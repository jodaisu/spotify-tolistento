const express = require('express');
const PORT = 8888;
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const client_secret = require('../dist/client_secret');


const apiRouter = require('./routes/userInfo.js')
const client_id = '3262d100566844bfae076dc40941c25a'; // client id



const redirect_uri = 'http://localhost:8888/callback'; // redirect uri

// generate random string function for cookie
const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// spotify state 'key' requirement
const stateKey = 'spotify_auth_state';

const app = express();

// // require routers

// const userInfo = require('./routes/userInfo');


// app.use('/api/userInfo', userInfo);


// define route handlers
app.use(express.static(__dirname + '/'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser());

app.use('/', apiRouter);




// request to login with spotify
app.get('/login', (req, res) => {

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // application requests authorization here

  const scope = 'user-read-private user-read-email user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

// grab access token and make requests
app.get('/callback', (req, res) => {

  // application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    // has user token, handle api requests here, then redirect to /home
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {

        const access_token = body.access_token,
            refresh_token = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        // get user info here
        request.get(options, (error, response, body) => {
          res.locals.userInfo = body
        });

        // get user's top artists
        const topArtists = {
          url: 'https://api.spotify.com/v1/me/top/artists',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        }



        // body.items is an array of objects (map!!!)
        request.get(topArtists, (error, response, body) => {
          // console.log(body.items);
        });

        // old chain default behavior old redirect
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));

      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

// refresh_token feature
app.get('/refresh_token', (req, res) => {

  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };
  
  // make a post request
  request.post(authOptions, (err, res, body) => {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// serve bundle.js
app.get('/dist/bundle.js', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'))
})

// serve react app
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});



 
console.log(`Listening on port ${PORT}`);
app.listen(8888);