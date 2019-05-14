'use strict';

/*********
 * MIDDLEWARE SETUP
 */

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const sha256 = require('js-sha256');
const PORT = process.env.PORT || 3000;

//static files
app.use(cors());

//Database
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));


/***********
 * Route
 */
app.get('/long-url', getShortUrl);


/***********
 * Handlers
 */
function getShortUrl(request, response) {
  let url = request.query.data;
  let sql = 'SELECT * FROM url WHERE long_url = $1;';
  let values = [url];

  return client.query(sql, values)
    .then(data => response.send((data.rowCount > 0) ? data.rows[0] : shortenURL(url)))
    .catch(error => handleError(error));
}


function handleError(err, res) {
  console.error('ERROR:', err);

  if (res) {
    res.status(500).send('Status 500: I done messed up.');
  }
}


/***********
 * Helpers
 */
function shortenURL(url){
  let newUrl = new URL(url);
  newUrl.create_hash();
  
  let sql = 'INSERT INTO url (long_url, short_url, clicks) VALUES ($1, $2, $3)';
  let values = [newUrl.long_url, newUrl.short_url, newUrl.clicks]; 

  return `cj2.site/${ newUrl.short_url }`;
};



/***********
 * Constructor
 */
function URL (long_url) {
  this.long_url = long_url,
  this.short_url = '',
  this.clicks = 0;
}


// Method for creating short_url hash
URL.prototype.create_hash = function() {
  this.short_url = sha256(this.long_url).slice(0,4);
  console.log('Short URL', this.short_url);
};
