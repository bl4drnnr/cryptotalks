const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../../../../.env.development')
})

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.POSTGRES_POST_LOCAL,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  }
}
