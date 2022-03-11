

const bodyParser = require('body-parser')
const express = require('express')

var app = express()

app.use(bodyParser.json())

let serverdefaults = 
{
    stoneCost: "53",
    leapCost: "171",
    shardCost: "240",
    solargraceCost:"70",
    solarblessing:"70",
    solarprotection:"70"
}

app.post('/update-costs', function(req,res){
    res.status(200).send("Ok")
})

app.get('/ping', function(req,res){
    res.status(200).send("Ok")
})
app.get('/health-check', function(req,res){
    res.status(200).send("Ok")
})
module.exports = app