const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handleErrors = require('./middleware/handleErrors');

const indexRouter = require('./routes/index');

// Set up Express Application
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);

// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});
app.use(handleErrors);

// Export for use in ./bin/www
module.exports = app;
