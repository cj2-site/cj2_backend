'use strict';

/*********
 * MIDDLEWARE SETUP
 */
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const sha256 = require('js-sha256');
const PORT = process.env.PORT || 3000;

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
 * Handler
 */
function getShortUrl(request, response) {
  // Check Db for url
  
  // If in db, return short url
  // Else shorten url, save to db, then return to user 
  response.send('In getShortUrl');
}



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
