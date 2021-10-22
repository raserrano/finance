const express = require('express')
const path = require('path')
// const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Models & Database
// const db = require('./model/db')

// Routes & Controllers
const index = require('./routes/index')
const users = require('./routes/users')
const currencies = require('./routes/currencies')
const cdps = require('./routes/cdps')
const interests = require('./routes/interests')
const metals = require('./routes/metals')
const loans = require('./routes/loans')
const cryptos = require('./routes/cryptos')

const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// TODO Generate favicon, logo and design
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/robots.txt', function (req, res, next) {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /')
})

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)
app.use('/currencies', currencies)
app.use('/cdps', cdps)
app.use('/interests', interests)
app.use('/metals', metals)
app.use('/users', users)
app.use('/loans', loans)
app.use('/cryptos', cryptos)

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
