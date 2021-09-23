const expressJSDocSwagger = require('express-jsdoc-swagger');

/**
 * Configure given application to use look for JSDoc comments and configure the Swagger Specification Docs
 * @param {import('express').Application} app express application
 */
function configureSwagger(app) {
  // Swagger set up
  /**
   * @type {import('express-jsdoc-swagger').Options}
   */
  const options = {
    openapi: '3.0.0',
    info: {
      title: 'DigitalCrafts Shop API',
      version: '1.0.0',
      description:
        'Example API made to teach how to work with RESTful JSON API systems',
      contact: {
        name: 'DigitalCrafts',
        url: 'https://digitalcrafts.com',
      },
    },
    swaggerUiOptions: {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
    security: {
      Bearer: {
        type: 'http',
        description:
          'JWT token. Use the `/api/v1/users/authentication` route to get retrieve an active token',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    basePath: '/api/v1',
    servers: [
      ...(process.env.NODE_ENV === 'development'
        ? [
            {
              description: 'Development',
              url: `http://localhost:${process.env.PORT || 3000}`,
            },
          ]
        : []),
      {
        description: 'Production',
        url: `${process.env.APP_URL || 'https://tbd.digitalcrafts.com'}`,
      },
    ],
    baseDir: __dirname,
    filesPattern: [
      '../routes/api/**/*.js',
      '../models/**/*.js',
      '../middleware/validate.js',
      '../errors/**/*.js',
    ],
    swaggerUIPath: '/docs',
    exposeApiDocs: true,
    apiDocsPath: '/docs.json',
  };

  expressJSDocSwagger(app)(options);
}

module.exports = configureSwagger;
