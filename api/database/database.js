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
Sequelize.authenticate().then(() => {console.log('Connection has been established successfully.'); }).catch(err => { console.error('Unable to connect to the database:', err);});

module.exports = connection