let session = require('express-session');

let classes = require('./Classes');
let sessionData = {};
var id = 1;

const DEBUG = false;

function createSessionData(req)  {
  req.session.sid = id;
  sessionData[id] = new classes.Model(id); 
  //console.log(Object.prototype.toString.call(new classes.Stimulator())); 
  //sessionData[id].pProg.groups[0] = new classes.Lead();
  //console.log((new classes.Stimulator) instanceof classes.Stimulator); 
  id++;
  
}
function getSessionModel(req)  {
  if(!req.session.sid)  
    createSessionData(req);
  return sessionData[req.session.sid];
};
function getSessionData(req)  {
  return getSessionModel(req).getDataAsText();
};


function parseRequest(req, res, data)  {
  if(DEBUG || req.method.toLowerCase() === "post") {
  req.query.classname = req.query.classname || req.body.classname;
  req.query.id = req.query.id || req.body.id;
  req.query.param = req.query.param || req.body.param;
  console.log("\n---------------------------------REQUEST DATA----------------\n")
  console.log(req.method)
  console.log(`class: ${req.query.classname}, param: ${req.query.param}`)
  console.log(`setType: ${req.body.setType}, setValue: ${req.body.setValue}`)
  }
  

  if(!req.query || !req.query.classname || !req.query.param)  return;
  if(req.body.setType === null || req.body.setValue === null) return;
  let obj = getObject(req);
  
  //console.log(obj[req.query.param]);
  if(obj[req.query.param] == undefined || (typeof obj[req.query.param] == "object" && !obj[req.query.param].sendable)) return;
  data.curValue = obj[req.query.param];
  data.oldValue = obj[req.query.param];
  if(req.method.toLowerCase() === "post" || req.method.toLowerCase() === "put") {
    // Add " and ' to injecction stopper??? Create whitelist // req.body.setValue.match(/["'<>/\\=+_&\|]/))
    if((typeof req.body.setValue != 'number' && typeof req.body.setValue != 'boolean')  && !req.body.setValue.match(/^[0-9a-zA-Z -@.]+$/))  {data.success = false;} // Prevents HTML code injection.
    if(typeof req.body.setType === "string" && data.success === undefined) {
      if(req.body.setType.toLowerCase().startsWith("abs"))  { 
        obj[req.query.param] = req.body.setValue;
      } else if (req.body.setType.toLowerCase().startsWith("rel"))  {
        obj[req.query.param] += req.body.setValue;
      }
    } 
    data.curValue = obj[req.query.param];
    data.setValue = req.body.setValue;
    data.setType = req.body.setType;
    if (data.success === undefined) 
      data.success = (data.oldValue != undefined && data.oldValue != data.curValue) || (req.body.setValue === data.curValue);
    
  }
  if(DEBUG || req.method.toLowerCase() === "post") {
    console.log("\n-------------------------------RESPONSE DATA-----------------\n");
    console.log(`curValue: ${data.curValue}, oldValue: ${data.oldValue}, setValue: ${data.setValue}, success: ${data.success}`);
  }
}

function getObject(req) {
  let className = req.query.classname;
  if(!className)  return {};
  if(typeof className != "string" || typeof req != "object") return {};
  let model = getSessionModel(req);
  className = className.toLowerCase().replace("-","");
  try {
    switch(className) {
      case "model": return model;
      case "cprog":
      case "clinicianprogrammer":
        return model.cProg;  
      case "pprog":
      case "patientprogrammer":
        return model.pProg;  
      case "doctor":
      case "physician":
        return model.cProg.doctor;
      case "patient":
        return model.pProg.patient;
      case "patientstimulator":
      case "patientstim":
      case "pstim":
        return model.pProg.stim;
      case "clinicianstimulator":
      case "clinicianstim":
      case "cstim":
        return model.cProg.stim;    
    }
    let id = req.query.id;
    if(!id) return {};
    if(className === "group")  {
      for(let i=0; i<model.pProg.groups.length; i++)  {
        if(model.pProg.groups[i].id == id)  return model.pProg.groups[i];
      }
      for(let i=0; i<model.cProg.groups.length; i++)  {
        if(model.cProg.groups[i].id == id)  return model.cProg.groups[i];
      }
    }
    if(className === "lead") {
      for(let i=0; i<model.pProg.leads.length; i++)  {
        if(model.pProg.leads[i].id == id)  return model.pProg.leads[i];
      }
      for(let i=0; i<model.cProg.leads.length; i++)  {
        if(model.cProg.leads[i].id == id)  return model.cProg.leads[i];
      }
    }

  } catch {
    return {};
  }
  return {};
}

module.exports = {getSessionData, parseRequest}