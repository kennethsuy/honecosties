

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
module.exports = app