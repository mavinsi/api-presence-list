const Sequelize = require('sequelize')
const pg = require('pg')
 const connection = new Sequelize('postgres://markyn:4dW604oeTIXMkPQzfq3L0APohXPqAuEh@dpg-ceqldd9a6gdovo1319rg-a.oregon-postgres.render.com/dbpresence')
// const connection = new Sequelize(process.env.DATABASE_URL, {
//     dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false
//         }
//     }
// })


module.exports = connection