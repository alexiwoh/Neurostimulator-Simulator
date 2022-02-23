let session = require('express-session');

let classes = require('./Classes');
let sessionData = {};
var id = 1;
//let model = new classes.Model();

function createSessionData(req)  {
  req.session.sid = id;
  sessionData[id] = new classes.Model(id);
  id++;
  console.log("Created sid!");
}
function getSessionData(req)  {
  if(!req.session.sid)  
    createSessionData(req);
  console.log(`ID: ${req.session.sid}`);
  return sessionData[req.session.sid].getID().toString(10);
};

module.exports = {getSessionData}