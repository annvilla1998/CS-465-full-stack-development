require('dotenv').config()

// Sequelize configuration for the application
module.exports = {
    url: process.env.POSTGRES_URI,
    dialect: 'postgres',
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false // Set to true if you have proper SSL certificates
        } : false
    }
}