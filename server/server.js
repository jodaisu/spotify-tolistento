const express = require('express');
const PORT = 8888;
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');


const client_id = '3262d100566844bfae076dc40941c25a'; // client id
const client_secret = '75ae3e87832f4b0488a167efe314c1c1'; // secret
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

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(cookieParser());


app.get('/login', (req, res) => {

  //set cookie for /login
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // application requests authorization here
  // change scope to gain more access
  const scope = 'user-read-private user-read-email user-top-read';

  // redirect to spotify when user req for /login
  // url query serves as headers
  res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }));

});

app.get('/callback', (req, res) => {

  // your application requests refresh and access tokens
  // after checking the state parameter
  let code = req.query.code || null;
  let state = req.query.state || null;

  // check if there is a state already
  let storedState = req.state ? req.cookies[stateKey] : null;

  // if there's no state or the current state doesnt match, redirect to error

  if (state === null || state != storedState){
    res.redirect('/#' + 
      querystring.stringify({
        error: 'state_mismatch'
      }));
  }// if state is valid
    else{
    res.clearCookie(stateKey);
    
    // SPOTIFY AUTHORIZATION SETUP
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    // SPOTIFY AUTH REQUEST FOR ACCESS TOKEN
    request.post(authOptions, (err, res, body) => {
      if (!err && res.statusCode === 200){

        const access_token = body.access_token
        const refresh_token = body.refresh_token

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use access token to access API
        // In this case, client information
        request.get(options, (err, res, body) => {
          console.log(body);
        })

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } // if token is invalid
        else {
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



app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});
 
console.log(`Listening on port ${PORT}`);
app.listen(8888);