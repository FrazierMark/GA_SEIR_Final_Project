require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

require('./config/database');

// Require controllers here

const app = express();

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json()); // this line configures the server to process json
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, 'build')));
// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user
app.use(require('./config/auth')); 
// api routes must be before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use("/api/locations", require("./routes/api/locations"));
app.use("/api", require("./routes/api/notes"));


// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // <-- this is where our production app is
  // going to server the client, so the final react code! On heroku
});

const port = process.env.PORT || 3001;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://m-mark-frazier.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://localhost:3001',
  issuer: 'https://m-mark-frazier.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});



app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});
