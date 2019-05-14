'use strict';

/*********
 * MIDDLEWARE SETUP
 */

require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const express = require('express');
const sha256 = require('js-sha256');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
//BASE URL
const BASE_URL = 'http://cj2.site';

// Database
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));


/***********
 * Routes
 */
app.get('/long-url', getShortUrl);
app.get('*', handleRedirect);



/***********
 * Handlers
 */
// This route handler checks the db for a record then returns it, else it returns a new url object
function getShortUrl(request, response) {
  let url = request.query.data;
  let sql = 'SELECT * FROM url WHERE long_url = $1;';
  let values = [url];

  return client.query(sql, values)
    .then(data => response.send((data.rowCount > 0) ? data.rows[0] : shortenURL(url)))
    .catch(error => handleError(error));
}

//Method to redirect
function handleRedirect(request, response) {
  //pull
  console.log(request.params[0].slice(1));
  let url = request.params[0].slice(1);
  let sql = 'SELECT * FROM url WHERE short_url = $1;';
  let values = [url];


  return client.query(sql, values)
    .then(updateDBClicks(url))
    .then(data => response.redirect(`${ data.rows[0].long_url }`))
    .catch(error => handleError(error));
}

// This function takes an error and then sends a generalized error to the user.
function handleError(err, res) {
  console.error('ERROR:', err);

  if (res) {
    res.status(500).send('Status 500: I done messed up.');
  }
}



/***********
 * Helpers
 **********/

// This function takes a url, creates a new Url object, and then returns the url object with the shortened url and qrcode
let shortenURL = (url) => {
  let newUrl = new URL(url);
  newUrl.create_hash();
  newUrl.getQRCode();
  
  let sql = 'INSERT INTO url (long_url, short_url, clicks, qr_code) VALUES ($1, $2, $3, $4)';
  let values = [newUrl.long_url, newUrl.short_url, newUrl.clicks, newUrl.qr_code]; 

  client.query(sql, values);

  return newUrl;
};

//function to update the  number of clicks
const updateDBClicks = (url) => {
  let sql = 'UPDATE url SET clicks = clicks+1 WHERE city = $1;';
  let values = [url];

  client.query(sql, values);
};



/***********
 * Constructor
 */
function URL (long_url) {
  this.long_url = long_url,
  this.short_url = '',
  this.clicks = 0,
  this.qr_code = '';
}

// Method for creating short_url hash
URL.prototype.create_hash = function() {
  this.short_url = sha256(this.long_url).slice(0,4);
  console.log('Short URL', this.short_url);
};

//function to get qr code
URL.prototype.getQRCode = function() {
  this.qr_code = `http://api.qrserver.com/v1/create-qr-code/?data=${ this.short_url }!&size=100x100`;
};
