const dotenv = require('dotenv');
dotenv.config();
const environment = process.env
module.exports = {
  "type": 'postgres',
  "host": environment.DB_HOST || 'localhost',
  "post": environment.DB_PORT || 3306,
  "username": environment.DB_USERNAME || 'root',
  "password": environment.DB_PASSWORD || 'root',
  "database": environment.DB_DATABASE || 'merchant_gateway',
  "entities": ['src/orm/entities/**/*.ts'],
  "subscribers": ['src/orm/subscribers/**/*.ts'],
  "migrations": ['migrations/**/*.ts'],
  "logging": true,
}
