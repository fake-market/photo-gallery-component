const express = require('express');
const parser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
require('../db/config');

const app = express();
const PORT = 1990;

app.use(helmet());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../static')));

app.listen(PORT, () => console.log('Listening on PORT:', PORT));