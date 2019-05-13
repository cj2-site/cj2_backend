'use strict';

/*********
 * MIDDLEWARE SETUP
 */
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());

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


