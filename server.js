'use strict';

/*******************
 * MIDDLEWARE SETUP
 *******************/

require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const express = require('express');
const sha256 = require('js-sha256');
const bs58 = require('bs58');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Database
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));



/*********
 * Routes
 *********/

app.get('/long-url', getShortUrl);
app.get('*', handleRedirect);
app.put('*', decrementShortUrl);



/***********
 * Handlers
 ***********/

// This route handler checks the db for a record then returns it, else it returns a new url object
function getShortUrl(request, response) {
  let url = request.query.data;


  //validate the entered url
  if(/http(s)?:\/\/cj2.site(\/\w*)?/.test(url)){
    generateError(response);
    // response.send(request.query.data);
  } else {
    let sql = 'SELECT * FROM url WHERE long_url = $1;';
    let values = [url];

    return client.query(sql, values)
      .then(data => {
        if (data.rowCount > 0) {
          let count = data.rows[0].times_created + 1;
          let updateSQL = 'UPDATE url SET times_created = $1 WHERE long_url = $2';
          let updateValues = [count, url];

          client.query(updateSQL, updateValues);

          response.send(data.rows[0]);
        } else {
          let newURL = shortenURL(url);

          response.send(newURL);
        }
      })

      .catch(error => handleError(error, response));
  }
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
    .catch(error => generateError(error, response));
}

// This function decrements the times created then deletes from db is 0
// The premise of this function keeps states for each user possibly using the same link
// And to not remove that link if one of N user chooses to delete their link from the DB
function decrementShortUrl(request, response) {
  let url = request.params[0].slice(1);
  let sql = 'SELECT * FROM url WHERE short_url = $1;';
  let values = [url];

  return client.query(sql, values)
    .then(data => {
      let count = data.rows[0].times_created - 1;

      if (count === 0) {
        let deleteSQL = 'DELETE FROM url WHERE id = $1;';
        let deleteValues = [data.rows[0].id];

        client.query(deleteSQL, deleteValues);
      } else {
        let updateSQL = 'UPDATE url SET times_created = $1 WHERE short_url = $2;';
        let updateValues = [count, url];

        client.query(updateSQL, updateValues);
      }

      response.send(data.rows[0]);
    })
    .catch(error => generateError(error, response));
}

// This function takes an error and then sends a generalized error to the user.
function handleError(err, res) {
  console.error('ERROR:', err);

  if (res) {
    res.status(500).send('Status 500: I done messed up.');
  }
}

// Function for error handling
function generateError(err, response) {
  // Don't worry about this...
  let norris_url = 'http://api.icndb.com/jokes/random?exclude=explicit';
  superagent.get(norris_url)
    .then(result => {
      response.status(500).send(`Status 500 Server Error: ${result.body.value.joke}`);
    })
    .catch(error => handleError(error, response));
}



/**********
 * Helpers
 **********/

// This function takes a url, creates a new Url object, and then returns the url object with the shortened url and qrcode
function shortenURL (url){
  let newUrl = new URL(url);
  newUrl.times_created = 1;
  newUrl.create_hash();
  newUrl.getQRCode();

  let sql = 'INSERT INTO url (long_url, short_url, clicks, qr_code, times_created) VALUES ($1, $2, $3, $4, $5)';
  let values = [newUrl.long_url, newUrl.short_url, newUrl.clicks, newUrl.qr_code, newUrl.times_created];

  client.query(sql, values);

  return newUrl;
}

// Function to update the  number of clicks
// Takes in a String
function updateDBClicks (shorturl){
  let sql = 'UPDATE url SET clicks = clicks+1 WHERE short_url = $1;';
  let values = [shorturl];

  client.query(sql, values);
}

// Function to check if db already contains the short url
// Takes in a String and returns a Bool
function checkDB(param){
  let sql = 'SELECT * FROM url WHERE short_url = $1;';
  let values = [param];
  let flag;

  client.query(sql, values)
    .then(data => {data.rowCount > 0 ? flag = true: flag = false;})
    .catch(error => handleError(error));

  return flag;
}



/**************
 * Constructor
 **************/

// URL Constructor
function URL(long_url) {
  this.long_url = long_url,
  this.short_url = '',
  this.clicks = 0,
  this.qr_code = '',
  this.times_created = 0;
}

// Method for creating short_url hash
URL.prototype.create_hash = function() {
  let index = 0;
  let hash = sha256(this.long_url);
  // Test for base 58 hash
  hash = bs58.encode(Buffer.from(hash));

  hash = hash.slice(index, index + 4);

  while(checkDB(hash) && index < hash.length){
    index += 4;
    hash = hash.slice(index, index + 4);
    console.log('Duplicate short_url');
  }
  this.short_url = hash;
};

// Function to get qr code
URL.prototype.getQRCode = function() {
  this.qr_code = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=https://cj2.site/${this.short_url}`;
};
