const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  development: {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'psql',
    dialectOptions: {
      ssl: true,
    },
  },
}
