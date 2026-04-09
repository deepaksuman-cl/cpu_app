require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mariadb",
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mariadb",
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  }
};