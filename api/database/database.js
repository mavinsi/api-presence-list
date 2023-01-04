const Sequelize = require('sequelize')
const pg = require('pg')
const connection  = new Sequelize('postgresql://postgres:mSFfyGVGJDeIJFRa3vVT@containers-us-west-144.railway.app:7885/railway')
//  const connection = new Sequelize('gopresence','postgres','147258', {
//        host: 'localhost',
//        dialect: 'postgres'

// })

module.exports = connection