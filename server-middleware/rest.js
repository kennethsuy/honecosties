

const bodyParser = require('body-parser')
const express = require('express')

var app = express()

app.use(bodyParser.json())


app.get('/ping', function(req,res){
    res.status(200).send("Ok")
})
app.get('/health-check', function(req,res){
    res.status(200).send("Ok")
})
app.get('/get-material-req', function(req,res){
    let tier = req.params.tier
    let slot = req.params.slot
    const jsonData = require('../matsrequired.json')
    let jsonValues = jsonData["armortier3a"]["9to10"]
    //let thisTier = req.body.tier 
    //import json
    //let returnjson = imported value[something thisTier]
    res.json({tier: slot})
})
module.exports = app
