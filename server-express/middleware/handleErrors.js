const express = require('express');
const pe = require('../lib/prettyError');

/**
 * Handle errors with Pretty Error
 * @param {Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 */
function handleErrors(err, req, res, next) {
  // set outputs, only providing error in development
  const status = err.status || 500;
  const error = req.app.get('env') === 'development' ? err : {};

  // Set error status
  res.status(status);

  // determine if error needs json response
  if (req.accepts('html', 'json') === 'json' || req.path.startsWith('/api')) {
    res.json(error);
  } else {
    res.send(errorHtml(error, status));
  }

  // render nice error to page
  console.error(pe.render(err));
}

/**
 * Get Error HTML from and Error Object
 * @param {Error} error The error to display
 * @param {number} status Status code
 * @returns String of HTML
 */
function errorHtml(error, status) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Error</title>
  <style>h1,h2 { font-family: sans-serif }</style>
</head>
<body>
  <h1> Error ${status}</h1>
  <h2>${error.message || ''}</h2>
  <pre>${error.stack || ''}</pre>
</body>
</html>
  `;
}

module.exports = handleErrors;
