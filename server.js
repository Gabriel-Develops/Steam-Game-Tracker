const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const steamAuth = require('node-steam-openid')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')
const steamRoutes = require('./routes/steam')
const fetch = require('node-fetch')
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)
require('./config/steamAuth')

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Main routes has all main routes
app.use('/', mainRoutes)
app.use('/steam', steamRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    
