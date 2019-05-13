'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/hello', (request, response) => {
  response.status(200).send('Hello');
});

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
