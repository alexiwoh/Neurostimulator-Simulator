/* eslint-disable */ 

// Alexander Iwoh
// /server/index.js 
/***                        ***/
/*** HTTP REQUEST HANDLING  ***/
/***                        ***/

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
});

/*
For POST/PUT requests the body has the format {setType: "absolute" or "relative", setValue: <SomeValue>}
"absolute" denotes the setValue overwrites the target parameter's value.
"relative" denotes the setValue is added to the target parameter's value.
*/ 
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
});
app.listen(port, () => {console.log(`Server listening at http://localhost:${port}`)});

module.exports = app;