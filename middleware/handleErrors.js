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
 * @param {import('express').NextFunction} next express next function
 */
function handleErrors(err, req, res, next) {
  // set outputs, only providing error in development or if safe to expose
  const status = err.status || 500;
  const error = req.app.get('env') === 'development' || err.expose ? err : {};

  // Set error status
  res.status(status);

  // determine if error needs json response
  if (req.accepts('html', 'json') === 'json' || req.path.startsWith('/api')) {
    res.json(error);
  } else {
    res.send(errorHtml(error, status));
  }

  // pass error on so it displays in the console with the error stack
  next(err);
}

module.exports = handleErrors;
