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

