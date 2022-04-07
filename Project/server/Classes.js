
/*getDataAsText() is a debug function that returns all variables of the Class in text form.*/
//const { set } = require(".");

const MAX_ID = 1000000

class Model {
  // Class that links multiple Programmer devices.
  constructor(m_id=0) {
    this._id = m_id;
    this.pProg = new PatientProgrammer(); // Patient programmer object.
    this.cProg = new ClinicianProgrammer(); // Clinician programmer object.
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
  // Prints all data as text.
  getDataAsText() {
    let s = "\n"
    s += "Model ID: " + this.id.toString(10) + "\n------------\n";
    s += this.pProg.getDataAsText() + "\n-----------\n" + this.cProg.getDataAsText();
    return s;
  }
  init()  {}
}

class Programmer {
  // Class representing a Programmer device. 

  #tid; // Stores setInterval() objects.
  constructor(type="patient") {
    this.initDefaults(type);
    this.#tid = setInterval(() => {this._date.setSeconds(this._date.getSeconds()+15)},15000); // Increment date each second.
    // Remember to clearInterval()!!!!!
  }

  initDefaults(type="patient")  {
    this._type = type; // Type of programmer: Patient or Clinician.
    this._on = false; // Programmer on/off state.
    this._hibernate = false; // Hibernation on/off state.
    this._batteryLevel = 1.0; // Battery level of device.
    this._currentGroup = randInt(0,3); // Currently selected group setting.
    this._serialNo = "SC1005"; // Serial number.
    this._versionNo = "5.0.2.0"; // Version number.
    this._manufacturerDate = new Date("02-Apr-2014"); // Manufacturer date.
    this._alerts = []; // Array of strings.
    this._stim = new Stimulator(); // Stimulator.
    this._groups = [new Group("Awake"),new Group("Sleeping"),new Group(),new Group()]; // List of Group settings.
    this._date = new Date(); // Current date.
    this._waitTime = 0;
    this._leads = []; // List of Lead settings.
    for (let g=0; g<this.groups.length; g++) {
      let gr = this.groups[g];
      for (let l=0; l<gr.leads.length; l++) { 
        let li = gr.leads[l];
        this.leads.push(li);
      }
    }
  }

  
  get type() {return this._type;}
  set type(t) { 
    if(typeof t == 'string' && /\w*/.test(t)) {
      if(t.toLocaleLowerCase() === "patient" || t.toLocaleLowerCase() === "clinician") {this._type = t; return true;}
    }
    return false;
  }
  get on() {return this._on;}
  set on(on) {if(typeof on == 'boolean') this._on = on;}
  get hibernate() {return this._hibernate;}
  set hibernate(h)  {if(typeof h == 'boolean') this._hibernate = h;}
  get batteryLevel()  {return this._batteryLevel;}
  set batteryLevel(p)  {if(typeof p == 'number' && p >= 0.0 && p <= 1.0) this._batteryLevel = p;}
  get currentGroup()  {return this._currentGroup;}
  set currentGroup(g) {if(typeof g == 'number' && g >= 0 && g <= this.groups.length - 1) this._currentGroup = Math.round(g);}
  get serialNo()  {return this._serialNo;}
  set serialNo(s) {if(typeof s == 'string' && /^[a-zA-Z]*[0-9]*$/.test(s) && s.length < 10)  this._serialNo = s;}
  get versionNo() {return this._versionNo;}
  set versionNo(v)  {if(typeof v == 'string' && /^([0-9]*(\.)){3}[0-9]*$/.test(v) && v.length < 20) this._versionNo = v;}
  get manufacturerDate()  {return this._manufacturerDate.toDateString();}
  set manufacturerDate(d) {if(d && Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d)) this._manufacturerDate = d;}
  get alerts()  {return this._alerts;}
  set alerts(a) {;}
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
  get groupData()  {return {groupIDs: this.groups.map(g => g.id), targets: this.groups[this.currentGroup].leadTargets.targets, groups: this.groups.map(g => g.name), currentGroup: this.currentGroup, sendable: true};}
  set groupData(s) {;}

  connectStimulator(stim) {this.stim = stim;}
  chargeDevice(amt) {this.batteryLevel += amt;}
  endAllSimulation() {}
  saveSettings(settings) {}
  exit() {}


  // Prints all data as text.
  getDataAsText() {
   
    let s = "\n";
    s += ((this.type.toLowerCase() in ["clinician", "patient"]) ? (`${this.type[0].toUpperCase() + this.type.substring(1).toLowerCase()}`) : this.type);
    s += ` --- Battery Level: ${this.batteryLevel}`;
    s += this.stim.getDataAsText();
    s += `\nState: ${this.on ? "ON" : "OFF"} --- Hibernate: ${this.hibernate ? "ON" : "OFF"} --- curGroup: ${this.currentGroup} --- Date: ${this.date}`;
    s += `\nSerial #: ${this.serialNo} --- Software Version: ${this.versionNo} --- Manufacturer Date: ${this.manufacturerDate}`;
    s += `\n Alerts: [${this.alerts}] --- numLeads: ${this.leads.length}`
    //s += this.leads.map(l => l.getDataAsText()).join("");
    s += this.groups.map(g => g.getDataAsText()).join("");
    return s;
  }
}

class PatientProgrammer extends Programmer {
  constructor(patient = new Patient()) {
    super("patient");
    this._patient = patient; 
    this.serialNo = "CB0708";
    this.stim.name = "Patient Stimulator";
  }
  get patient()  {return this._patient;}
  set patient(a) {if(a && a instanceof Patient) this._patient = a;}
}
class ClinicianProgrammer extends Programmer {
  constructor(doctor = new Doctor()) {
    super("clinician");
    this._stimOffTime = 30; // How long it takes (in seconds) before a magnet held over the device switches off delivered therapy.
    this._rampDuration = 1; // How long it takes (in seconds) for the NS to reach the requested amplitude.
    this._doctor = doctor; 
    this._password = "";
    this.key = "";
    this.stim.name = "Clinician Stimulator";
  }
 
  #key;
  impedenceInterval; // The frequency with which you want the system to measure lead impedance. 
  match(password) { // Checks if input password (hash?) matches actual password hash.
    return this.password === password;
  }

  get stimOffTime() {return this._stimOffTime;}
  set stimOffTime(a)  {if(typeof a == "number" && a >= 0 && a < 3600*24) this._stimOffTime = a;}
  get rampDuration()  {return this._rampDuration;}
  set rampDuration(a)  {if(typeof a == "number" && a >= 0 && a < 3600) this._rampDuration = a;}
  get doctor()  {return this._doctor;}
  set doctor(a) {if(a && a instanceof Doctor) this._doctor = a;}
  get password()  {return "**********";}
  set password(s) {if(typeof s == 'string' && /\w*/.test(s) && s.length < 20)  this._password = s;}
  

  // Prints all data as text.
  getDataAsText() {
    let s = "";
    s += super.getDataAsText();
    s += `\nMagnet Stim off time: ${this.stimOffTime}s --- Ramp Duration: ${this.rampDuration}s`;
    return s;
  }
}

class Stimulator {
  // Class representing a Stimulator: INS or TNS. 
  constructor(name="Stimulator",imagePath="") {
    this._name = name; 
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



  getDataAsText() {
    let s = "\n";
    s += "Stimulator Name: " + this.name + ` --- Stimulator SN: ${this.SN} --- Version No: ${this.versionNo} --- Voltage: ${this.voltage}`;
    return s;
  }
}

class Group {
  static _gid = 0; // id counter. 
  static get gid()  {return Group._gid;}
  static set gid(a) {if(typeof a == "number" && a >= 0 && a < MAX_ID) Group._gid = a;}

  constructor(name="") {
    this._id = Group.gid++; 
    this._name = name;
    this._leads = [new Lead(),new Lead(),new Lead(),new Lead()]; // List of Lead settings.
    this._curLeadID = this._leads[0].id;
    this._curLeadIndex = 0;
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
  get leadIDs() {return {ids: this.leads.map(l => l.id), sendable: true};}
  set leadIDs (a) {;}
  get leadTargets() {return {targets: this.leads.map(l => l.targetName), sendable: true};}
  set leadTargets (a) {;}
  get leadInfo()  {return {on:this.leads[this.leadIndex].on, level:this.leads[this.leadIndex].level, target:this.leads[this.leadIndex].targetName, sendable: true, id: this.leadID, index: this.leadIndex};}
  set leadInfo(s) {;}
  
  getDataAsText() {
    let s = "\n";
    s += `Group: ${this.name} (ID: ${this.id})\n`;
    s += this.leads.map(l => l.getDataAsText()).join("");
    return s;
  }
}

class Lead {
  // Class that represents stimulation settings for a Lead.
  static _lid = 0; // id counter.
  static get lid()  {return Lead._lid;}
  static set lid(n) {if(typeof n == 'number' && n >= 0 && n < MAX_ID) Lead._lid = n;}
  constructor() {
    this._id = Lead.lid++; 
    this._on = [true,false][randInt(0,1)]; // Lead on/off state.
    this._level = Number((randInt(0,100)/100).toFixed(2)); // Lead intensity.
    this._lotNumber = "100001"; 
    this._modelNumber = "MN10450";
    this._targetName = ['L Foot', 'R Foot', 'L Leg', 'R Leg','L Arm','R Arm','Back'][randInt(0,6)]; // Body part to be targeted by Lead setting.
    this.#electrodes = ['+','-','N','N'];
    this.#impedeace = 65534; 
    this.#location = "''"; 
    this.#stepSize = randInt(1,3);
    this.#pulseAmplitude = 0; 
    this.#maxAmplitude = 6000; 
    this.#pulseWidth = 300; 
    this.#pulseFrequency = 20;
    this.#anatomy = "Foot (arch)"; 
    this.#strength = "Burning";
  }
  getDataAsText() {
    let s = "\n";
    s += "Lead ID: " + this.id.toString(10);
    s += ` --- State: ${this.on ? "ON" : "OFF"} --- Level: ${this.level} --- Lot #: ${this.lotNumber} --- Model #: ${this.modelNumber}`;
    s += ` --- Target Name: ${this.targetName} --- Anatomy: ${this.#anatomy} --- Strength: ${this.#strength}`;
    s += `\nElectrodes: [${this.#electrodes}] --- Impedance: ${this.#impedeace} Ω --- Location: ${this.#location}`;
    s += ` --- Pulse Amp: ${this.#pulseAmplitude}μA (max: ${this.#maxAmplitude}μA) --- Pulse Width: ${this.#pulseWidth}μs --- Pulse Freq: ${this.#pulseFrequency}Hz`;
    s += `--- Step Size: ${{1 : ">", 2 : ">>", 3 : ">>>"}[this.#stepSize]}`;
    return s;
  }  

  get id()  {return this._id;}
  set id(n) {if(typeof n == 'number' && n >= 0 ) this._id = n;}
  get on() {return this._on;}
  set on(b)  {if(typeof b == 'boolean') this._on = b;}
  get level() {return this._level;} 
  set level(n) {if(typeof n == 'number' ) {this._level = Number((Math.max(0,Math.min(n,1))).toFixed(2));}} 
  get lotNumber() {return this._lotNumber;} 
  set lotNumber(s) {if(typeof s == 'string' && /^[0-9]*$/.test(s) && s.length < 10)  this._lotNumber = s;}
  get modelNumber() {return this._modelNumber;}
  set modelNumber(s)  {if(typeof s == 'string' && /^[a-zA-Z]*[0-9]*$/.test(s) && s.length < 10)  this._modelNumber = s;}
  get targetName()  {return this._targetName;} 
  set targetName(s) {if(typeof s == 'string' && /\w*/.test(s) && s.length < 20) this._targetName = s;}
  #electrodes; // Electreode settings: + (positive), - (negative), N (neutral). There must be at least one positive and one negative electrode.
  #impedeace; // Active impedence in Ohms. 65534 Ω indicates an open or missing lead.
  #location; // Spinal level where stimulation therapy is delivered by this lead.
  #stepSize; // Affects how much values change by pressing the arrow buttons. Ranges from 1-3 and affects multiple parameters.
  #pulseAmplitude; // Amplitude in μA. Ranges from 0 to 6000μA by default.
  #maxAmplitude; // 6000μA by default.
  #pulseWidth; // Ranges from 40 - 1000μs.
  #pulseFrequency; // Ranges from 4 – 80 Hz.
  #anatomy; // Where the stimulus is applied.
  #strength; // Qualitative description of strength.
}

class Person {
  _title;
  _name;
  id; // Person's id number assigned by institution. 
  _phoneNumber; // A string in the format xxx-xxx-xxxx, with x being a digit. 
  _address;
  notes; // Free form notes about the person.

  constructor(title = "", name = "", id = "", phoneNumber = "123-456-7890", address = "123 Axium Blvd.", notes = "") {
    this.setTitle(title); this.setName(name); this.setPhoneNumber(phoneNumber); this._address = address; this.notes = notes; this.id = id;
  }
  get name()  {return this.getName();}
  set name(s) {this.setName(s);}
  get title()  {return this.getTitle();}
  set title(s) {this.setTitle(s);}
  get phoneNumber()  {return this.getPhoneNumber();}
  set phoneNumber(s) {this.setPhoneNumber(s);}
  get address() {return this._address;}
  set address(s)  {if(typeof s == 'string' && /^[a-zA-Z0-9]+$/.test(s) && s.length < 30)  this._address = s;}


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
    if(typeof name === 'string' && /\w*/.test(name) && name.length < 20)  {
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
  constructor(title = "Dr.", name = "Vojislav", id = "", phoneNumber = "098-765-4321", address = "456 Axium Blvd", notes = "",
    clinicName = "The Corriveau Hospital", clinicEmail = "info@spinalmodulation.com", clinicHistory = "") {
    super(title,name,id,phoneNumber,address,notes);
    this._clinicName = clinicName; this._clinicEmail = clinicEmail; this.clinicHistory = clinicHistory;
  }
  _clinicName;
  _clinicEmail;
  clinicHistory;

  get email() {return this._clinicEmail;}
  set email(s) {if(typeof s == 'string' && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+$/.test(s) && s.length < 30)  this._clinicEmail = s;}
  get clinicName()  {return this._clinicName;}
  set clinicName(s) {if(typeof s == 'string' && /^[a-zA-Z0-9]+$/.test(s) && s.length < 30)  this._clinicName = s;}

  performTrial(patient)  {}
  getDataAsText() {
    let s = "\n";
  
  }
}

class Patient extends Person {
  constructor(title = "Mr.", name = "Alex", id = "", phoneNumber = "123-456-7890", address = "123 Axium Street", notes = "", dob = new Date("01-Jan-1969")) {
    super(title,name,id,phoneNumber,address,notes);
    this.dob = dob;
  }
  dob; // Date of birth.
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