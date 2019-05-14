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
 * Handlers
 */
function getShortUrl(request, response) {
  let sql = 'SELECT * FROM url WHERE long_url = $1;';
  let values = [request.query.data];

  return client.query(sql, values)
    .then(data => {
      return (data.rowCount > 0) ? data.rows[0] : shortenURL(request.query.data);
    })
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
let shortenURL = (url) => {
  // let newUrl = new URL(request.query.data);
  // newUrl.create_hash();
  // response.send(`cj2.site/${ newUrl.short_url }`);
  console.log(`In shorten URL: ${ url }`);
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
