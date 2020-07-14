const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// connecting to mongo and checking if DB is running
async function connectMongoose() {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log('Connected to the DB');
  } catch (error) {
    console.log('ERROR: Seems like your DB is not running, please start it up!!!');
  }
}
connectMongoose();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', require('./endpoints/posts/route'));
app.use('/users', require('./endpoints/users/route'));

module.exports = app;
