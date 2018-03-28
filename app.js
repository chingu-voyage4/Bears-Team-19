require('dotenv').config();

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('bears-team-19:server');

const index = require('./routes/index');
const projects = require('./components/projects/projects');

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
const url = require('url');

const mongoDB = url.format({
  protocol: 'mongodb',
  slashes: true,
  auth: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  hostname: process.env.DB_HOST,
  port: process.env.DB_PORT,
  pathname: process.env.NODE_ENV && process.env.NODE_ENV.startsWith('test') ? process.env.DB_TEST_PATH : process.env.DB_PATH,
});
debug(`Connecting to ${mongoDB}`);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/projects', projects);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res /* , next */) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
