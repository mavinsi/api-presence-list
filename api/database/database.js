const Sequelize = require('sequelize')
const pg = require('pg')
//  const connection = new Sequelize('gopresence','postgres','147258', {
//    host: 'localhost',
//    dialect: 'postgres'
// })
const connection = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    }
})


module.exports = connection