console.log("[API] STATUS: INICIANDO")
const express = require('express')
const sequelize = require('sequelize')
const connection = require('./database/database')
const {Confirmed, Event }= require('./database/eventModel')
connection.authenticate().then(() => {console.log('Connection has been established successfully.'); }).catch(err => { console.error('Unable to connect to the database');});
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")

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




app.post("/eventCreate", (req, res) => {
    let { adminpass,eventid, eventname, bannerurl, background, eventdate, localization, information, list } = req.body
    Event.create({
        adminpass: adminpass,
        eventid: eventid,
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
})
app.get("/event", (req, res) => {

    if (req.query.id == undefined || null) {
        res.send(400)
    } else {

        res.statusCode = 200;
        console.log("[API] Party GET request to " + req.query.id)

        //    let party = db.get('event').filter(e => e.id == req.query.id)
        console.log(req.query.id)
        Event.findOne({ raw: true, nest: true, where: { eventid: req.query.id } }).then(Event => {
            res.send(Event)
        })


    }

})

app.post("/event", (req, res) => {
    if (req.query.id == undefined || null) {
        res.send(400)
    } else {
        let { instagram, name, id, eventid } = req.body
        
                        Confirmed.findAll({ raw: true, nest: true, where: { eventid: eventid } }).then(person => {
                            console.log("=======NOVA REQUISEIÇÃO========")
                            
     if(person.some(result => result.personInstagram == instagram) == true){
        res.send(419)
     }else{
        if(person.some(result => result.personName == name) == true){
            res.send(420)
        }else{
                                        Confirmed.create({
                                            eventid,
                                            personid: id,
                                            personInstagram: instagram,
                                            personName: name,
                                            personChecked: false
                                          }).then(()=>{
                                          res.send(200)
                                          })
        }
     }
                    //     person.forEach(element => {

                    //         console.log(`${element.personName} == ${name}`)
                    //         if(element.personName == name){
                    //          console.log("420")
                               
                    //             return res.send(420)
                               
                    // }else{
                    //     console.log(`${element.personInstagram} == ${instagram}`)
                    //     if(element.personInstagram == instagram){
                    //         console.log("419")
                    //         return  res.send(419)
                    //     }else{
                    //         Confirmed.create({
                    //                         eventid,
                    //                         personid: id,
                    //                         personInstagram: instagram,
                    //                         personName: name,
                    //                         personChecked: false
                    //                       }).then(()=>{
                    //                         return  res.send(200)
                    //                       })
                          
                    //     }
                    // }
                    
                    //    });
                         

                       })
                     }

                
    
                
})



app.listen(process.env.PORT || 3000, () => {
    console.log("[API] STATUS: ONLINE")
    console.log(`[API] URL`)
})