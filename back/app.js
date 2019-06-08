require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const debug = require('debug')('back:app');

mongoose
.connect(process.env.DB, {useNewUrlParser: true})
.then(x => {
  debug(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(err => {
  debug('Error connecting to mongo', err)
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);


module.exports = app;
