const Sequelize = require('sequelize');
const connection = require('./database')

const Event = connection.define('events', {
    adminpass: {
        type: Sequelize.STRING,
        allowNull: false
    },
    eventid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    eventdesc: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    eventname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    bannerurl: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    background: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    eventdate: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    localization: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    information: {
        type: Sequelize.TEXT
    }
});

const Confirmed = connection.define('confirmeds', {

    eventid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    personid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    personInstagram: {
        type: Sequelize.TEXT
    },
    personName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    personChecked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
})


Event.sync({ force: false }).then(() => {

})
Confirmed.sync({ force: false }).then(() => {})

module.exports = { Event, Confirmed }