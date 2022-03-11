// Alexander Iwoh
// /server/index.js 

var logic = require('./Logic');
var express = require('express');
var app = express();
const path = require("path");
const url = require("url"); 
let session = require('express-session');
app.use(session({secret: "My umm secret"}));

//Body parser
let bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}));  
app.use(bodyParser.json());

const port = process.env.PORT || 3001;
app.get(['/api','/info'], function(req,res) {
  res.json({ message : logic.getSessionData(req)});
  //res.json({ message: "Hi from server!!!" });
  //res.setHeader('Content-Type','application/json');
  //res.status(200).send({dataType: "",data: "api", message: "Hello"});
});
app.post(['/api','/info'], function(req,res) {
  res.status(200).send("Thanks for the Post request!");
});
app.put(['/api','/info'], function(req,res) {
  res.status(200).send("Thanks for the Put request!");
});
app.use('/', function(req,res) {
  res.json({ message : logic.getSessionData(req)});
  //res.status(200).send("Simulation started!");
  //return next();
});
app.listen(port, () => {console.log(`Server listening at http://localhost:${port}`)});

module.exports = app;