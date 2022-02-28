/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const mainRouter = require('./routes/index');

require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/', mainRouter);

app.use('/static', express.static(path.join(__dirname, 'static')));

app.listen(port, () => {
  console.log(`App port ${port}`);
});
