var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Models & Database
var db = require('./model/db');

// Routes & Controllers
var index = require('./routes/index');
var users = require('./routes/users');
var currencies = require('./routes/currencies');
var cdps = require('./routes/cdps');
var interests = require('./routes/interests');
var metals = require('./routes/metals');
var users = require('./routes/users');
var loans = require('./routes/loans');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// TODO Generate favicon, logo and design
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/currencies', currencies);
app.use('/cdps', cdps);
app.use('/interests', interests);
app.use('/metals', metals);
app.use('/users', users);
app.use('/loans', loans);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
