'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const sha256 = require('js-sha256');
const PORT = process.env.PORT || 3000;

app.use(cors());

//Database
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();

app.get('/hello', (request, response) => {
  response.status(200).send(test);
});

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

//URL OBJECT

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

const test = new URL('http://thisissample');
test.create_hash();
