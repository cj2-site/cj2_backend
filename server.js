'use strict';

require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const express = require('express');
const sha256 = require('js-sha256');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

//Database
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();

app.get('/hello', (request, response) => {
  let url_obj = new URL(request.query.data);
  url_obj.create_hash();
  response.status(200).send(url_obj);
  // const test = new URL('http://thisissample');
  // test.create_hash();
  // getQRCode(test.short_url);
  // response.status(200).send(test);

});

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));

//URL OBJECT

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
const getQRCode = (url) => {
  let qrURL = `http://api.qrserver.com/v1/create-qr-code/?data=${url}!&size=100x100`;
  superagent.get(qrURL)
    .buffer(true).parse(superagent.parse.image)
    .then(res => {
      console.log(res.body);
    });


};


