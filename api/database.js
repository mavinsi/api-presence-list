const Sequelize = require('sequelize')
const pg = require('pg')
const connection = new Sequelize('dcrqmbbc8bp385','mdiwitafmsyjgh','66c5e11b0e8b9c41a0ad4376f3a7479444c80385b265fbd522cd631aac2061c2', {
    host: 'ec2-54-204-241-136.compute-1.amazonaws.com',
    dialect: 'postgres'
})

module.exports = connection