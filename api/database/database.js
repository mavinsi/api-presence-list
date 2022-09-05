const Sequelize = require('sequelize')
const pg = require('pg')
const connection = new Sequelize('gopresence','postgres','147258', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = connection