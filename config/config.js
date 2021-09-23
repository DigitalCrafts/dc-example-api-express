module.exports = {
  development: {
    dialect: 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || 'dcshop',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
  },
  production: {
    dialect: 'postgres',
    // if DATABASE_URL exists, use that, else fall back to individual values
    ...(process.env.DATABASE_URL
      ? {
          use_env_variable: 'DATABASE_URL',
        }
      : {
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || null,
          database: process.env.DB_DATABASE || 'dcshop',
          host: process.env.DB_HOST || '127.0.0.1',
          port: process.env.DB_PORT || 5432,
        }),
    // if DB_HEROKU_SSL exists, then we need to add a few extra postgres options
    ...(process.env.DB_HEROKU_SSL
      ? {
          ssl: { require: true, rejectUnauthorized: false },
        }
      : {}),
  },
};
