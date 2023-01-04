const Sequelize = require('sequelize')
const pg = require('pg')
const connection  = new Sequelize('postgres://markyn:4dW604oeTIXMkPQzfq3L0APohXPqAuEh@dpg-ceqldd9a6gdovo1319rg-a/dbpresence')
//  const connection = new Sequelize('gopresence','postgres','147258', {
    //    host: 'localhost',
    //    dialect: 'postgres'

// })

module.exports = connection