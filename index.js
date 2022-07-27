require('dotenv').config()
const mongoDbConnection = require('./utils/db.config')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express')
const logger = require('morgan')
require('./utils/db.config')
const passport = require('passport')
require('./utils/authStategies/localStrategy')
const authMiddleware = require('./middlewares/authMiddleware')
const flasherMiddleware = require('./middlewares/flasherMiddleware')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const categoryApiRoutes = require('./routes/api/categoryRoutes')
const app = express()
const config = require('./utils/config')
const { trimAndSantizeObject } = require('./utils/global')
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'pug')
// app.set('trust proxy', 1)
app.use(session({
  secret: 'ee461a2924cb56fb8da19ea73c44a5407d435f87',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },//en false para que ande aca en local host pero en true es para https http
    store: new MongoStore({ mongooseConnection: mongoDbConnection }) 
}))
app.use(express.static('public'))
app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  trimAndSantizeObject(req.body)
  return next()
})

/**
 * Global middleware to make logged in user available to the views
 */
app.use((req, res, next) => {
  res.locals.assetUrl = config.assetUrl
  res.locals.user = req.isAuthenticated() ? req.user : null
  app.locals.pretty = process.env.NODE_ENV !== 'production' // pretty output
  return next()
})

/**
 * App level locals
 */
app.locals.title = 'ECOMMERCE-CODER'
app.locals.message = {} // Used in displaying alert
app.locals.formData = {} // For prefilling data on form validation
app.locals.errors = {} // Form validation errors

app.use('/', authRoutes)
app.use('/', categoryRoutes)
app.use('/api/v1/category', categoryApiRoutes)

app.get('/', flasherMiddleware, (req, res) => {
  return res.render('pages/homepage')
})

app.get('/dashboard', authMiddleware, (req, res) => {
  return res.render('dashboard/dashboard')
})

app.use((req, res, next) => {
  res.status(404).render('pages/404')
})

app.listen(PORT, () => {
  console.log('servidor a su servicio en puerto:', PORT)
});

module.exports = app
