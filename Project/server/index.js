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
  data = {};
  logic.parseRequest(req, res, data);
  data.message = logic.getSessionData(req)
  res.json(data);
  //res.json({ message: "Hi from server!!!" });
  //res.setHeader('Content-Type','application/json');
  //res.status(200).send({dataType: "",data: "api", message: "Hello"});
});
app.post(['/api','/info'], function(req,res) {
  let data = {}
  logic.parseRequest(req, res, data);
  res.status(200).json(data);
});
app.put(['/api','/info'], function(req,res) {
  let data = {}
  logic.parseRequest(req, res, data);
  res.status(200).json(data);
});
app.use('/', function(req, res) {
  data = {};
  logic.parseRequest(req, res, data);
  data.message = logic.getSessionData(req);
  res.json(data);
  //res.status(200).send("Simulation started!");
  //return next();
});
app.listen(port, () => {console.log(`Server listening at http://localhost:${port}`)});

module.exports = app;