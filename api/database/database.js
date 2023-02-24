const Sequelize = require('sequelize')
const pg = require('pg')
// const connection  = new Sequelize('postgresql://postgres:2KQlHJzJald3WYxHptvs@containers-us-west-27.railway.app:6066/railway')
 const connection = new Sequelize('riseway', 'postgres', '147258', {
     host: 'localhost',
     dialect: 'postgres'

 })

module.exports = connection
