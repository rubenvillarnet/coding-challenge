require('dotenv').config()
const express = require('express')
var cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const debug = require('debug')('back:app')

console.log('entorno', process.env.NODE_ENV === 'test' ? 'test' : 'production')
mongoose
  .connect(process.env.NODE_ENV === 'test' ? process.env.TESTDB : process.env.DB, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    debug('Error connecting to mongo', err)
  })

const app = express()

var allowedOrigins = [process.env.HOST, 'http://localhost:3000']
app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin: ' + origin
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    }
  })
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const usersRouter = require('./routes/users')
app.use('/api', usersRouter)

app.use((req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

module.exports = app
