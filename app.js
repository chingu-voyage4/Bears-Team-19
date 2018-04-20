require('dotenv').config();

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('bears-team-19:server');

// Routes
const index = require('./routes/index');
const projects = require('./components/projects/projects');
const contact = require('./components/contact/contact.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport
const passport = require('passport');
require('./components/auth/passport.js');

const auth = require('./components/auth/auth.js');
const users = require('./components/user/user.js');

// Set up mongoose connection
const mongoose = require('mongoose');
const url = require('url');

const mongoDB = url.format({
  protocol: 'mongodb',
  slashes: true,
  auth: `${process.env.DB_USER}:${process.env.DB_PASSWORD }`,
  hostname: process.env.DB_HOST,
  port: process.env.DB_PORT,
  pathname: process.env.NODE_ENV && process.env.NODE_ENV.startsWith('test') ? process.env.DB_TEST_PATH : process.env.DB_PATH,
});

debug(`Connecting to ${mongoDB}`);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Authentication

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  secure: false,
}));

app.use(passport.initialize());
app.use(passport.session());


/*
  view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/projects', projects);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/contact', contact);


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
