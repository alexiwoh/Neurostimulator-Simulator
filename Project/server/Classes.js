/* eslint-disable */ 

/***                        ***/
/*** CLASSES FOR SIMULATION ***/
/***                        ***/

/*getDataAsText() is a debug function that returns all variables of the Class in text form.*/

const MAX_ID = 1000000

// Class that links multiple Programmer devices.
class Model {
  constructor(m_id=0) {
    this._id = m_id;
    this.pProg = new PatientProgrammer(); // Patient programmer object.
    this.cProg = new ClinicianProgrammer(); // Clinician programmer object.
    this.cProg.prog = this.pProg; // Links pProg to cProg so they can sync data.
    Lead.lid = 0; Group.gid = 0;
  } 
  get id()  {return this._id}
  set id(id)  {
    console.log("id-set")
    try {
      if(id < 0 || id > MAX_ID)  return false;
      this._id = parseInt(id,10); 
      return true;}
    catch(err) {return false;}
  }
  getDataAsText() {
    let s = "\n"
    s += "Model ID: " + this.id.toString(10) + "\n------------\n";
    s += this.pProg.getDataAsText() + "\n-----------\n" + this.cProg.getDataAsText();
    return s;
  }
}

// Class representing a Programmer device. 
class Programmer {
  #tid; #tid2; // Stores setInterval() objects.
  constructor(prog = undefined, type="patient") {
    this._prog = (prog && Object.prototype.toString.call(prog) === "[object Programmer]") ? prog : undefined;
    this.initDefaults(this._prog, type);
    this.#tid = setInterval(() => {
      this._date.setSeconds(this._date.getSeconds()+15);
    }, 15000); // Increment date each second.
    
    this.#tid2 = setInterval(()=>{
      if(this.on) this._batteryLevel -= 0.005;
      if(this.batteryLevel <= 0)  {this.on = false; this.batteryLevel = 0.0;}
      if(this.batteryLevel >= 1)  {this.batteryLevel = 1.0;}
      if(!this.on)  {this.batteryLevel += 0.2; return;}

      let leads = this.groups[this.currentGroup].leads;
      for(let l = 0; l < leads.length; l++)  {
        if(this.stim.type === "") break;
        let li = leads[l];
        if(li.on) this.batteryLevel -= li.level/25;
      }
    }, 5000); // Decrease battery percentage based on Leads' 'level' and Programmer 'on' variables.
  }

  initDefaults(type="patient")  {
    this._type = type; // Type of programmer: Patient or Clinician.
    this._on = false; // Programmer on/off state.
    this._batteryLevel = 1.0; // Battery level of device.
    this._currentGroup = randInt(0,3); // Currently selected group setting.
    this._serialNo = "SC1005"; // Serial number.
    this._versionNo = "5.0.2.0"; // Version number.
    this._manufacturerDate = new Date("02-Apr-2014"); // Manufacturer date.
    this._stim = new Stimulator(); // Stimulator.
    this._groups = [new Group("Awake"),new Group("Sleeping"),new Group("Sitting"),new Group("Napping"), new Group("Idle"), new Group("Quick Treatment"), new Group("")]; // List of Group settings.
    this._date = new Date(); // Current date.
    this._waitTime = 0;
    this._leads = []; // List of Lead settings.
    // Stores all Lead objects of all Group objects in this._leads.
    for (let g = 0; g < this.groups.length; g++) {
      let gr = this.groups[g];
      for (let l=0; l <gr.leads.length; l++) { 
        let li = gr.leads[l];
        this.leads.push(li);
      }
    }
    this.leads[0].on = false; this.leads[0].level = 0.0;
    this._patient = new Patient(); // Patient that is treated.
    this._doctor = new Doctor(); // Physician. 
    this._prog = undefined; // Programmer that is linked to this object for syncing purposes.
  }

  // Getter/setters.
  get type() {return this._type;}
  set type(t) { 
    if(typeof t == 'string' && /\w*/.test(t)) {
      if(t.toLocaleLowerCase() === "patient" || t.toLocaleLowerCase() === "clinician") {this._type = t; return true;}
    }
    return false;
  }
  get on() {return this._on;}
  set on(on) {if(typeof on == 'boolean') this._on = on;}
  get batteryLevel()  {return Number(this._batteryLevel.toFixed(2));}
  set batteryLevel(p)  {if(typeof p == 'number') this._batteryLevel = (Math.max(0,Math.min(p,1)));}
  get currentGroup()  {return this._currentGroup;}
  set currentGroup(g) {if(typeof g == 'number' && g >= 0 && g <= this.groups.length - 1) this._currentGroup = Math.round(g);}
  get serialNo()  {return this._serialNo;}
  set serialNo(s) {if(typeof s == 'string' && /^[a-zA-Z]*[0-9]*$/.test(s) && s.length < 10)  this._serialNo = s;}
  get versionNo() {return this._versionNo;}
  set versionNo(v)  {if(typeof v == 'string' && /^([0-9]*(\.)){3}[0-9]*$/.test(v) && v.length < 20) this._versionNo = v;}
  get manufacturerDate()  {return this._manufacturerDate.toDateString();}
  set manufacturerDate(d) {if(d && Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d)) this._manufacturerDate = d;}
  get stim()  {return this._stim;}
  set stim(d) {if(d && d instanceof Stimulator) this._stim = d;}
  get groups()  {return this._groups;}
  set groups(g) {;}
  get leads()  {return this._leads;}
  set leads(l) {;}
  get date()  {return this._date.getTime();}
  set date(s) {
    if(typeof s != 'string' && typeof s != 'number')  return;
    let d = new Date(s);
    if(d && Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d))
     this._date = d;
  }
  get waitTime()  {return this._waitTime;}
  set waitTime(w) {if(typeof w == "number" && w >= 0 && w < 3600) this._waitTime = w;}
  get groupData()  {return {groupIDs: this.groups.map(g => g.id), targets: this.groups[this.currentGroup].leadTargets.targets, groups: this.groups.map(g => g.name), currentGroup: this.currentGroup, sendable: true};} // Returns object with many values related to the group/lead information.
  set groupData(s) {;}
  get stimType()  {return this.stim.type;}
  set stimType(s) {
    let x = this.stim.type;
    let y;
    if(x === "") y = "TNS";
    else if (x === "TNS") y = "INS";
    else if (x === "INS") y = "";
    else y = 0;
    this.stim.type = y;
  } // Changes the Stimulator type from TNS -> INS -> <unbounded> -> TNS -> ...
  get turnOffAllStimulation() {
    for (let g=0; g<this.groups.length; g++) {
      let gr = this.groups[g];
      for (let l=0; l<gr.leads.length; l++) { 
        if(gr.leads[l].on) return false;
      }
    }
    return true;
  } // Returns whether all leads are off.
  set turnOffAllStimulation(a) {
    if (a === false)  return;
    for (let g=0; g<this.groups.length; g++) {
      let gr = this.groups[g];
      for (let l=0; l<gr.leads.length; l++) { 
        gr.leads[l].on = false;
      }
    }
  } // Turns off all leads.
  get patient()  {return this._patient;}
  set patient(a) {if(a && a instanceof Patient) this._patient = a;}
  get doctor()  {return this._doctor;}
  set doctor(a) {if(a && a instanceof Doctor) this._doctor = a;}
  get prog()  {return this._prog;}
  set prog(p)  {
    if(p instanceof Programmer) {
      this._prog = p;
      this._stim = p.stim;
      this._doctor = p.doctor;
      this._patient = p.patient;
      this._groups = p.groups;
      this._leads = p.leads;
    }
  } // Links the Programmer, p, to this one. Links some of their variables so that changes are synced between devices.

  // Prints all data as text.
  getDataAsText() {
    let s = "\n";
    s += ((this.type.toLowerCase() in ["clinician", "patient"]) ? (`${this.type[0].toUpperCase() + this.type.substring(1).toLowerCase()}`) : this.type);
    s += ` --- Battery Level: ${this.batteryLevel}`;
    s += this.stim.getDataAsText();
    s += `\nState: ${this.on ? "ON" : "OFF"} --- Hibernate: ${this.hibernate ? "ON" : "OFF"} --- curGroup: ${this.currentGroup} --- Date: ${this.date}`;
    s += `\nSerial #: ${this.serialNo} --- Software Version: ${this.versionNo} --- Manufacturer Date: ${this.manufacturerDate}`;
    s += `\n Alerts: [${this.alerts}] --- numLeads: ${this.leads.length}`
    s += this.groups.map(g => g.getDataAsText()).join("");
    return s;
  }
}

class PatientProgrammer extends Programmer {
  constructor() {
    super("patient"); 
    this.serialNo = "CB0708";
    this.stim.name = "Patient Stimulator";
  }
}
class ClinicianProgrammer extends Programmer {
  constructor() {
    super("clinician");
    this._stimOffTime = 30; // How long it takes (in seconds) before a magnet held over the device switches off delivered therapy.
    this._rampDuration = 1; // How long it takes (in seconds) for the NS to reach the requested amplitude.
    this._impedanceInterval = 6; // The frequency with which you want the system to measure lead impedance, in hours.
    this._followUpPeriod = 4; // Follow up period before next appointment, in weeks. 
    this.stim.name = "Clinician Stimulator";
  }

  get followUpPeriod() {return this._followUpPeriod;}
  set followUpPeriod(a) {if(typeof a == "number" && a > 0 && a < 53) this._followUpPeriod = a;}
  get impedanceInterval() {return this._impedanceInterval;}
  set impedanceInterval(a)  {if(typeof a == "number" && a > 0 && a < 24) this._impedanceInterval = a;}
  get stimOffTime() {return this._stimOffTime;}
  set stimOffTime(a)  {if(typeof a == "number" && a > 0 && a < 3600*24) this._stimOffTime = a;}
  get rampDuration()  {return this._rampDuration;}
  set rampDuration(a)  {if(typeof a == "number" && a > 0 && a < 3600) this._rampDuration = a;}
  get connected() {return this.stim === this.prog.stim;}
  set connected(a)  {
    if(a === true) this.stim = this.prog.stim;
    else this.stim = undefined;
  } // Connects a stimulator device. 
  get connect() {return this.connected;}
  set connect(a)  {this.connected = a;}

  // Prints all data as text.
  getDataAsText() {
    let s = "";
    s += super.getDataAsText();
    s += `\nMagnet Stim off time: ${this.stimOffTime}s --- Ramp Duration: ${this.rampDuration}s`;
    return s;
  }
}

// Class representing a Stimulator: INS or TNS. 
class Stimulator {
  constructor(name="Stimulator",type="TNS",imagePath="") {
    this._name = name; 
    this._type = type; // Type of stimulator conencted: TNS, INS, or "" (unbounded, ie. not connected).
    this._imagePath = imagePath; // Path to image file representing this stimulator.
    this._SN = "CB0848"; // Simulator serial number.
    this._versionNo = "4.0.5.1"; // Version number.
    this._implantDate = new Date("13-Sep-2013"); // Implant date.
    this._voltage = randInt(10,100)/20;
    this._connected = false;
  }

  get name()  {return this._name;}
  set name(a) {if(typeof a == 'string' && /\w*/.test(a) && a.length < 20) this._name = a;}
  get imagePath() {return this._imagePath;}
  set imagePath(a)  {;}
  get SN()  {return this._SN;}
  set SN(a) {if(typeof a == 'string' && /^[a-zA-Z]*[0-9]*$/.test(a) && a.length < 10) this._SN = a;}
  get versionNo() {return this._versionNo;}
  set versionNo(v)  {if(typeof v == 'string' && /^([0-9]*(\.)){3}[0-9]*$/.test(v) && v.length < 20) this._versionNo = v;}
  get connected() {return this._connected;} 
  set connected(a) {if(typeof a == 'boolean') this._connected = a;}
  get implantDate()  {return this._implantDate.getTime();}
  set implantDate(s) {
    if(typeof s != 'string' && typeof s != 'number')  return;
    let d = new Date(s);
    if(d && Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d))
    this._implantDate = d;
  }
  get voltage()  {return this._voltage;}
  set voltage(a)  {if(typeof a == 'number') this._voltage = a;}
  get type()  {return this._type;}
  set type(s) {if(s === "TNS" || s === "INS" || s === "")  this._type = s;}

  getDataAsText() {
    let s = "\n";
    s += "Stimulator Name: " + this.name + ` --- Stimulator SN: ${this.SN} --- Version No: ${this.versionNo} --- Voltage: ${this.voltage}`;
    return s;
  }
}

// Class that represents a Group that stores settings for multiple Lead objects.
class Group {
  static _gid = 0; // id counter. 
  static get gid()  {return Group._gid;}
  static set gid(a) {if(typeof a == "number" && a >= 0 && a < MAX_ID) Group._gid = a;}

  constructor(name="") {
    this._id = Group.gid++; 
    this._name = name;
    this._leads = [new Lead(),new Lead(),new Lead(),new Lead()]; // List of Lead settings.
    this._curLeadID = this._leads[0].id; // id of currently selected Lead in array.
    this._curLeadIndex = 0; // index of array of currently selected Lead.
    this._imagePath = ""; // Path to image file representing this stimulator.
  }  

  get leads() {return this._leads;}
  set leads(a) {;}
  get name()  {return this._name;}
  set name(a) {if(typeof a == 'string' && /\w*/.test(a) && a.length < 20) this._name = a;}
  get id()  {return this._id;}
  set id(n)  {if(typeof n == 'number' && n >= 0 && n < MAX_ID) this._id = n;}
  get imagePath()  {return this._image;}
  set imagePath(a) {;}
  get leadID()  {return this._curLeadID;}
  set leadID(n) {if(typeof n == 'number' && n >= 0 && n < MAX_ID) this._curLeadID = n;}
  get leadIndex()  {return this._curLeadIndex;}
  set leadIndex(n) {if(typeof n == 'number' && n >= 0 && n < this.leads.length) {this._curLeadIndex = n; this.leadID = this.leads[this.leadIndex].id}}
  get leadIDs() {return {ids: this.leads.map(l => l.id), sendable: true};} // Array of Lead ids in the _leads array.
  set leadIDs (a) {;}
  get leadTargets() {return {targets: this.leads.map(l => l.targetName), sendable: true};} // Array of Lead targets in the _leads array.
  set leadTargets (a) {;}
  get leadInfo()  {return {on:this.leads[this.leadIndex].on, level:this.leads[this.leadIndex].level, target:this.leads[this.leadIndex].targetName, 
    sendable: true, id: this.leadID, index: this.leadIndex, stepSize: this.leads[this.leadIndex].stepSize * Lead.stepBase,
    anatomy: this.leads[this.leadIndex].anatomy, strength: this.leads[this.leadIndex].strength};} // Various pieces of information pertaining to the currently selected Lead object.
  set leadInfo(s) {;}
  
  getDataAsText() {
    let s = "\n";
    s += `Group: ${this.name} (ID: ${this.id})\n`;
    s += this.leads.map(l => l.getDataAsText()).join("");
    return s;
  }
}

// Class that represents stimulation settings for a Lead.
class Lead {
  static _lid = 0; // id counter.
  static get lid()  {return Lead._lid;}
  static set lid(n) {if(typeof n == 'number' && n >= 0 && n < MAX_ID) Lead._lid = n;}
  static _stepBase = 0.05; // Base amount to increment Lead.
  static get stepBase() {return Lead._stepBase;}
  static set stepBase(n)  {;}
  constructor() {
    this._id = Lead.lid++; 
    //this._on = [true,false][randInt(0,1)]; // Lead on/off state. Randomize to start.
    this._on = false; // Start all leads off.
    this._level = Number((randInt(0,100)/100).toFixed(2)); // Lead intensity.
    this._lotNumber = "100001"; 
    this._modelNumber = "MN10450";
    this._targetName = ['L Foot', 'R Foot', 'L Leg', 'R Leg','L Arm','R Arm','Back'][randInt(0,6)]; // Body part to be targeted by Lead setting.
    this.#electrodes = ['+','-','N','N']; // [Unused] Electrode settings: + (positive), - (negative), N (neutral). There must be at least one positive and one negative electrode.
    this.#impedance = 65534;              // [Unused] Active impedence in Ohms. 65534 Ω indicates an open or missing lead.
    this.#location = "''";                // [Unused] Spinal level where stimulation therapy is delivered by this lead.
    this._stepSize = randInt(1,3); // Affects how much values change by pressing the arrow buttons. Ranges from 1-3 and affects multiple parameters.
    this.#pulseAmplitude = 0;             // [Unused] Amplitude in μA. Ranges from 0 to 6000μA by default.
    this.#maxAmplitude = 6000;            // [Unused] 6000μA by default.
    this.#pulseWidth = 300;               // [Unused] Ranges from 40 - 1000μs.
    this.#pulseFrequency = 20;            // [Unused] Ranges from 4 – 80 Hz.
    this._anatomy = ['Back', 'Front'][randInt(0,1)]; // Where the stimulus is applied.
    this._strength = ['Burning', 'Soft', 'Normal'][randInt(0,2)]; // Qualitative description of strength.
  }
  getDataAsText() {
    let s = "\n";
    s += "Lead ID: " + this.id.toString(10);
    s += ` --- State: ${this.on ? "ON" : "OFF"} --- Level: ${this.level} --- Lot #: ${this.lotNumber} --- Model #: ${this.modelNumber}`;
    s += ` --- Target Name: ${this.targetName} --- Anatomy: ${this.anatomy} --- Strength: ${this.strength}`;
    s += `\nElectrodes: [${this.#electrodes}] --- Impedance: ${this.#impedance} Ω --- Location: ${this.#location}`;
    s += ` --- Pulse Amp: ${this.#pulseAmplitude}μA (max: ${this.#maxAmplitude}μA) --- Pulse Width: ${this.#pulseWidth}μs --- Pulse Freq: ${this.#pulseFrequency}Hz`;
    s += `--- Step Size: ${{1 : ">", 2 : ">>", 3 : ">>>"}[this._stepSize]}`;
    return s;
  }  

  get id()  {return this._id;}
  set id(n) {if(typeof n == 'number' && n >= 0 ) this._id = n;}
  get on() {return this._on;}
  set on(b)  {if(typeof b == 'boolean') this._on = b;}
  get level() {return this._level;} 
  set level(n) {if(typeof n == 'number' ) {this._level = Number((Math.max(0,Math.min(n,1))).toFixed(5));}} 
  get lotNumber() {return this._lotNumber;} 
  set lotNumber(s) {if(typeof s == 'string' && /^[0-9]*$/.test(s) && s.length < 10)  this._lotNumber = s;}
  get modelNumber() {return this._modelNumber;}
  set modelNumber(s)  {if(typeof s == 'string' && /^[a-zA-Z]*[0-9]*$/.test(s) && s.length < 10)  this._modelNumber = s;}
  get targetName()  {return this._targetName;} 
  set targetName(s) {if(typeof s == 'string' && /\w*/.test(s) && s.length <= 20) this._targetName = s;}
  #electrodes;      
  #impedance;       
  #location;        
  get stepSize()  {return this._stepSize;} 
  set stepSize(n)  {if(typeof n == 'number' ) this._stepSize = Math.round(Math.max(1,Math.min(n,3)));}
  #pulseAmplitude; 
  #maxAmplitude;    
  #pulseWidth;      
  #pulseFrequency;  
  get anatomy() {return this._anatomy;}
  set anatomy(s) {if(typeof s == 'string' && /\w*/.test(s) && s.length < 30) this._anatomy = s;}
  get strength() {return this._strength;} 
  set strength(s) {if(typeof s == 'string' && /\w*/.test(s) && s.length < 30) this._strength = s;}
}

class Person {
  _title; // Person's title (eg. Dr.).
  _name;
  _id; // Person's id number assigned by institution. 
  _phoneNumber; // A string in the format xxx-xxx-xxxx, with x being a digit. 
  _address;
  _notes; // Free form notes about the person.

  constructor(title = "", name = "", id = "", phoneNumber = "123-456-7890", address = "123 Axium Blvd.", notes = "Add notes here...") {
    this.setTitle(title); this.setName(name); this.setPhoneNumber(phoneNumber); this._address = address; this._notes = notes; this._id = id; 
  }
  get id()  {return this._id;}
  set id(s) {if(typeof s == 'string' && /^[a-zA-Z]*[0-9]*$/.test(s) && s.length < 10)  this._id = s;}
  get name()  {return this.getName();}
  set name(s) {this.setName(s);}
  get title()  {return this.getTitle();}
  set title(s) {this.setTitle(s);}
  get phoneNumber()  {return this.getPhoneNumber();}
  set phoneNumber(s) {this.setPhoneNumber(s);}
  get address() {return this._address;}
  set address(s)  {if(typeof s == 'string' && /^[a-zA-Z0-9 .'-]+$/.test(s) && s.length < 30)  this._address = s;}
  get notes() {return this._notes;}
  set notes(s)  {if(typeof s == 'string' && s.length < 200)  this._notes = s;} 

  getTitle() {return this._title;} 
  setTitle(title) {
    if(typeof title === 'string' && /\w*/.test(title) && title.length < 20)  {
      this._title = title;
      return true;
    }
    return false;
  }
  getName() {return this._name;}
  setName(name) {
    if(typeof name === 'string' && /^[a-zA-Z0-9 .'-]+$/.test(name) && name.length < 20)  {
      this._name = name;
      return true;
    }
    return false;
  }
  getPhoneNumber()  {return this._phoneNumber;}
  setPhoneNumber(pNo) { 
    if(typeof pNo === 'string' && pNo.length < 20) {
      if(/\d{3}-\d{3}-\d{4}/.test(pNo))  {
        this._phoneNumber = pNo; 
        return true;
      }
    }
    return false;
  }

  getDataAsText() {
    let s = "\n";
  }

}
class Doctor extends Person {
  constructor(title = "Dr.", name = "Vojislav", id = "D221250", phoneNumber = "098-765-4321", address = "456 Axium Blvd", notes = "",
    clinicName = "The Corriveau Hospital", clinicEmail = "info@spinalmodulation.com") {
    super(title,name,id,phoneNumber,address,notes);
    this._clinicName = clinicName; this._clinicEmail = clinicEmail; 
  }
  _clinicName;
  _clinicEmail;

  get email() {return this._clinicEmail;}
  set email(s) {if(typeof s == 'string' && /^[a-zA-Z0-9]+@([a-zA-Z0-9]+.)+[a-zA-Z0-9]+$/.test(s) && s.length < 30)  this._clinicEmail = s;}
  get clinicName()  {return this._clinicName;}
  set clinicName(s) {if(typeof s == 'string' && /^[a-zA-Z0-9 .'-]+$/.test(s) && s.length < 30)  this._clinicName = s;}

  getDataAsText() {
    let s = "\n";
  }
}

class Patient extends Person {
  constructor(title = "Mr.", name = "Alex", id = "J052122", phoneNumber = "123-456-7890", address = "123 Axium Street", notes = "Add notes here...", dob = new Date("Jan 01 1969")) {
    super(title,name,id,phoneNumber,address,notes);
    this._dob = dob; // Date of birth.
  }
  get dob()  {return this._dob.getTime();}
  set dob(s) {
    if(typeof s != 'string' && typeof s != 'number')  return;
    let d = new Date(s);
    if(d && Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d))
    this._dob = d;
  }

  getDataAsText() {
    let s = "\n";
    s += `DOB: ${this.dob}`;
  }
}


/* Some utility functions */
function randInt(min = 0, max) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}


module.exports = {Model, Programmer, ClinicianProgrammer, PatientProgrammer, Group, Lead, Person, Stimulator, Doctor, Patient};