const path = require('path');
const sessionSequelize = require('connect-session-sequelize');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const createError = require('http-errors');
const logger = require('morgan');
const pe = require('./lib/prettyError');
const configureSwagger = require('./lib/swagger');
const authenticateRequest = require('./middleware/authenticateRequest');
const handleErrors = require('./middleware/handleErrors');
const db = require('./models');
const apiCategoriesRouter = require('./routes/api/categories');
const apiProductsRouter = require('./routes/api/products');
const apiUsersRouter = require('./routes/api/users');
const indexRouter = require('./routes/index');
// error definitions
require('./errors');

// Set up Express Application
const app = express();

// Enable PrettyError
pe.start();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Swagger Configuration
configureSwagger(app);

// Session
const SequelizeStore = sessionSequelize(session.Store);
const store = new SequelizeStore({ db: db.sequelize });
app.use(
  session({
    secret: process.env.APP_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store,
  }),
);
store.sync();

// Post-session Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Authentication Middleware
app.use(authenticateRequest);

// Routes
app.use('/', indexRouter);
app.use('/api/v1/products', apiProductsRouter);
app.use('/api/v1/categories', apiCategoriesRouter);
app.use('/api/v1/users', apiUsersRouter);

// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});
app.use(handleErrors);

// Export for use in ./bin/www
module.exports = app;
