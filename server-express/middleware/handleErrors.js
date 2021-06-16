const NotFoundError = require('../errors/notFoundError');
const pe = require('../lib/prettyError');

/**
 * Check if error should be shown
 * @param {Error} err error to check
 * @param {import('express').Request} req request object
 * @returns {boolean} should show error
 */
function showError(err, req) {
  const errorWhitelist = [NotFoundError];

  if (
    req.app.get('env') === 'development' ||
    errorWhitelist.some((x) => err instanceof x)
  ) {
    return false;
  }

  return true;
}

/**
 * Get Error HTML from and Error Object
 * @param {Error} error The error to display
 * @param {number} status Status code
 * @returns {string} String of HTML
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

/**
 * Handle errors with Pretty Error
 * @param {Error} err express error
 * @param {import('express').Request} req express request object
 * @param {import('express').Response} res express response object
 */
function handleErrors(err, req, res) {
  // set outputs, only providing error in development
  const status = err.status || 500;
  const error = showError(err, req) ? {} : err;

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

module.exports = handleErrors;
