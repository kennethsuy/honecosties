

const bodyParser = require('body-parser')
const express = require('express')
const moment = require('moment')
require('moment-timezone')



var app = express()

app.use(bodyParser.json())

const now = new moment().tz('America/New_York').format('M/DD h:mm A z')

let serverdefaults = 
{   
    updatedat: now,
    gstonecost: "53",
    dstonecost: "53",
    leapcost: "270",
    shardcost: "180",
    solargracecost:"116",
    solarblessingcost:"337",
    solarprotectioncost:"820",
    tailoringcost:"17800",
}

app.post('/update-costs', function(req,res){
    const postedjson = req.body.formdata
    if (req.body.gstonecost){ 
        serverdefaults.gstonecost = req.body.gstonecost
    }
    if (req.body.dstonecost){ 
        serverdefaults.dstonecost = req.body.dstonecost
    }
    if (req.body.leapcost){ 
        serverdefaults.leapcost = req.body.leapcost
    }
    if (req.body.shardcost){ 
        serverdefaults.shardcost = req.body.shardcost
    }
    if (req.body.solargracecost){ 
        serverdefaults.solargracecost = req.body.solargracecost
    }
    if (req.body.solarblessingcost){ 
        serverdefaults.solarblessingcost = req.body.solarblessingcost
    }
    if (req.body.solarprotectioncost){ 
        serverdefaults.solarprotectioncost = req.body.solarprotectioncost
    }
    if (req.body.tailoringcost){ 
        serverdefaults.tailoringcost = req.body.tailoringcost
    }
    serverdefaults.updatedat = new moment().tz('America/New_York').format('M/DD h:mm A z')
    res.json(serverdefaults)
    
})

app.get('/ping', function(req,res){
    res.status(200).send("Ok")
})
app.get('/health-check', function(req,res){
    res.status(200).send("Ok")
})
const jsonData = require('../matsrequired.json')
app.get('/get-material-req', function(req,res){
    const tier = req.query.tier
    const slot = req.query.slot
    if(jsonData[tier] && jsonData[tier][slot]){
        res.status(200).json(jsonData[tier][slot])
    }else{
        res.status(400).send("Invalid Tier + Slot")
    }
    
    let jsonValues = jsonData["armortier3a"]["9to10"]
    //let thisTier = req.body.tier 
    //import json
    //let returnjson = imported value[something thisTier]
    
})

app.get('/default-costs', function(req,res){
    res.json(serverdefaults)
})
module.exports = app
