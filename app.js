const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const csurf = require('csurf')
const dotenv = require('dotenv')
const express = require('express')
const logger = require('morgan')
const path = require('path')

dotenv.config()

const router = require('./routes')
const { csrf } = require('./middlewares/auth')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'frontend/build')))
app.use(router)
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'))
})
app.use(csrf.readCookie)
app.use(csrf.setCookie)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // send the error page
  res.status(err.status || 500)
  res.send(err)
})

module.exports = app
