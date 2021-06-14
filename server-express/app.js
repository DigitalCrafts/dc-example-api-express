const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const db = require('./models');
const handleErrors = require('./middleware/handleErrors');
const configureSwagger = require('./lib/swagger');
const pe = require('./lib/prettyError');
pe.start();

const indexRouter = require('./routes/index');
const apiProductsRouter = require('./routes/api/products');

// Set up Express Application
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Swagger Configuration
configureSwagger(app);

// Session
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: db.sequelize });
app.use(
  session({
    secret: process.env.APP_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store,
  })
);
store.sync();

// Post-session Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/api/v1/products', apiProductsRouter);

// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});
app.use(handleErrors);

// Export for use in ./bin/www
module.exports = app;
