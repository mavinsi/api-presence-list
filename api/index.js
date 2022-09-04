console.log("[API] STATUS: INICIANDO")
const express = require('express')
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

let DB = {
    party:[
        {
                id: "sambadudoutor",
                name: "Samba Du Doutor",
                nameicon: `<i class="text-green-500 fa-regular  fa-calendar mr-2"></i>`,
                bannerurl: `imgs/banner.jpg`,
                background: `imgs/background.jpg`,
                date: "17/09/22 ás 15:00H",
                localization: "Arena Way - Rua Lupércio, 380 Campo Grande",
                information: null,
                list: []
        },
        {
            id: "mandiso",
            name: "Euphoria Party",
            nameicon: `<i class="text-white fa-regular  fa-calendar mr-2"></i>`,
            bannerurl: `https://br.web.img3.acsta.net/pictures/19/06/18/12/06/4123858.jpg`,
            background: `https://i.pinimg.com/originals/49/cb/54/49cb549a68285cd9491e8ed7ab755ef5.png`,
            date: "08/10/22 ás 19:30H",
            localization: "Arena Way - Rua Lupércio, 380 Campo Grande",
            information: "- Leve sua bebida (refrigerante, suco e etc) <br><br>- Traje AllBlack e/ou Brilhoso OBRIGATÓRIO ",
            list: []
    },
    {
        id: "festa_dos_amigos",
        name: "Festa dos Amigos",
        nameicon: `<i class="text-white fa-regular  fa-calendar mr-2"></i>`,
        bannerurl: `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/glow-disco-party-poster-template-2d310ac36d313dfc6fbc11b714f3859f_screen.jpg?ts=1636978811`,
        background: `https://img.freepik.com/fotos-premium/pessoas-na-pista-de-danca_106386-142.jpg?w=2000`,
        date: "38/17/99 ás 19:30H",
        localization: "Algum Lugar - Rua Alguma, 000 Campo Grande",
        information: "- Leve sua bebida (refrigerante, suco e etc) <br>- Traje AllBlack e/ou Brilhoso OBRIGATÓRIO ",
        list: []
},
    ]
}



app.get("/event", (req, res) => {  

    if(req.query.id == undefined || null){
        res.send(400)
    }else{ 
    res.statusCode = 200;
    console.log("[API] Party GET request to " + req.query.id)
   let party = DB.party.filter(e => e.id == req.query.id)


    res.json(party)
}

})

app.post("/event", (req, res) => {
    if(req.query.id == undefined || null){
    res.send(400)
    }else{ 
    let { instagram, name, id } = req.body
    const id_list = id
    let party = DB.party.filter(e => e.id == req.query.id)
 console.log(party[0].list)
    const filtroID = party[0].list.filter(e => e.id == id_list)
    const filtroName = party[0].list.filter(e => e.name == name)
    const filtroInsta = party[0].list.filter(e => e.instagram == instagram)
    if(filtroName.length == 0){
        if(filtroInsta.length == 0){

    if (filtroID.length == 0) {
        party[0].list.push({
            id: id_list,
            checked: false,
            instagram,
            name
        })
        res.sendStatus(200)
        console.log(`[API] @${instagram} - confirmou presença`)
    } else {
        res.sendStatus(418)
    }
}else{
    res.sendStatus(419)
}
}else{
    res.sendStatus(420)
}
    }
})



app.listen(process.env.PORT || 3000, () => {
    console.log("[API] STATUS: ONLINE")
    console.log(`[API] URL`)
})