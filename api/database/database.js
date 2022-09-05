const Sequelize = require('sequelize')
const pg = require('pg')
const connection = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    }
})


module.exports = connection