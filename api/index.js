console.log("[API] STATUS: INICIANDO")
const express = require('express')
const sequelize = require('sequelize')
const connection = require('./database/database')
const { Confirmed, Event } = require('./database/eventModel')
connection.authenticate().then(() => { console.log('Connection has been established successfully.'); }).catch(err => { console.error('Unable to connect to the database'); });
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
const { info } = require('autoprefixer')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
function random(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}




app.post("/eventAdmin", (req, res) => {
    let { adminpass, eventid, eventdesc, eventname, bannerurl, background, eventdate, localization, information, list } = req.body
    Event.findOne({ raw: true, nest: true, where: { eventid: eventid } }).then(resultado => {
        if (resultado == null || undefined) {
            Event.create({
                adminpass: adminpass,
                eventid: eventid,
                eventdesc: eventdesc,
                eventname: eventname,
                bannerurl: bannerurl,
                background: background,
                eventdate: eventdate,
                localization: localization,
                information: information,
                list: list,
            }).then(() => {
                res.send(200)
            }).catch(error => {
                res.send(error)
            })
        } else {
            res.send(400)
        }
    }).catch(err => {
        console.log(err)
    })

})


app.put("/eventAdmin/", (req, res) => {
    let { eventid, adminpass, eventname, eventdesc, bannerurl, background, eventdate, localization, information } = req.body
    console.log(`Atualizando ${eventid}`)

    let total = {
        eventname: eventname,
        eventdesc: eventdesc,
        bannerurl: bannerurl,
        background: background,
        eventdate: eventdate,
        localization: localization,
        information: information
    }
    console.table(total)
    Event.update({ total }, { where: { eventid, adminpass } }
    ).then(() => {
        res.send(200)
    }).catch(err => {
        res.send(400)
    })

})
app.get("/", (req, res) => {

    res.send(200)

})
app.get("/event", (req, res) => {

    if (req.query.id == undefined || null) {
        res.send(400)
    } else {

        res.statusCode = 200;
        console.log("[API] Party GET request to " + req.query.id)
        let eventid = req.query.id
        //    let party = db.get('event').filter(e => e.id == req.query.id)
        console.log(req.query.id)
        Event.findOne({ raw: true, nest: true, where: { eventid: eventid } }).then(Event => {
            res.send(Event)
        })


    }

})
app.get("/list", (req, res) => {
    if (req.query.id == undefined || null) {
        res.send(400)
    } else {
        let eventid = req.query.id
        // biblioteca de operadores

        Confirmed.findAll({ raw: true, nest: true, where: { eventid: { [sequelize.Op.like]: `%${eventid}%` } } }).then(person => {
            console.table(person)
            let result = {
                data: person,
                counts: person.length
            }
            res.send(result)
        })
    }
})
app.post("/event", (req, res) => {
    if (req.body.eventid == undefined || null) {
        res.send(400)
    } else {
        let { instagram, name, id, eventid } = req.body

        Confirmed.findAll({ raw: true, nest: true, where: { eventid: eventid } }).then(person => {
            console.log("=======NOVA REQUISIÇÃO========")

            if (person.some(result => result.personInstagram == instagram) == true && person.some(result => result.personInstagram == "Não informado") == true) {
                res.send(419)
            } else {
                if (person.some(result => result.personName == name) == true) {
                    res.send(420)
                } else {
                    console.log(`${name} Confirmou presença em ${eventid}`)
                    Confirmed.create({
                        eventid: eventid,
                        personid: id,
                        personInstagram: instagram,
                        personName: name,
                        personChecked: false
                    }).then(() => {
                        res.send(200)
                    })
                }
            }


        })
    }




})



app.delete("/eventAdmin", (req, res) => {
    console.table(req.body)
    if (req.body.eventid == undefined || null) {
        res.send(400)
    } else {


        Event.destroy({ where: { eventid: req.body.eventid, adminpass: req.body.adminpass } }).then(function (rowDeleted) {
            if (rowDeleted === 1) {
                Confirmed.destroy({ where: { eventid: req.body.eventid } }).then(function (rowDeleted) {
                    if (rowDeleted >= 0) {
                        res.send(200)
                        console.log('Evento/Convidados Deletados');
                    } else {
                        res.send(400)
                    }
                }, function (err) {
                    res.send(400)
                    console.log(err);
                });
            } else {
                res.send(404)
            }
        }, function (err) {
            res.send(400)
            console.log(err);
        });

    }
})


app.delete("/event", (req, res) => {
    console.table(req.body)
    if (req.body.id == undefined || null) {
        res.send(400)
    } else {
        let personid = String(req.body.id)
        let eventid = String(req.query.id)

        Confirmed.destroy({ where: { personid: personid, eventid: { [sequelize.Op.like]: `%${eventid}%` } } }).then(function (rowDeleted) {
            if (rowDeleted === 1) {
                res.send(200)
                console.log('Pessoa deletada');
            } else {
                res.send(400)
            }
        }, function (err) {
            res.send(400)
            console.log(err);
        });

    }
})



app.listen(3000, () => {
    console.log("[API] STATUS: ONLINE")
    console.log(`[API] URL`)
})
