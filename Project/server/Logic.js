let session = require('express-session');

let classes = require('./Classes');
let sessionData = {};
var id = 1;

function createSessionData(req)  {
  req.session.sid = id;
  sessionData[id] = new classes.Model(id); 
  console.log(Object.prototype.toString.call(new classes.Stimulator())); 
  //sessionData[id].pProg.groups[0] = new classes.Lead();
  console.log((new classes.Stimulator) instanceof classes.Stimulator); 
  id++;
  
}
function getSessionData(req)  {
  if(!req.session.sid)  
    createSessionData(req);
  return sessionData[req.session.sid].getDataAsText();
};

module.exports = {getSessionData}