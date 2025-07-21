require('dotenv').config()

// Sequelize configuration for the application
module.exports = {
  development: {
    url: process.env.POSTGRES_URI,
    dialect: 'postgres',
  },
}