
/*getDataAsText() is a debug function that returns all variables of the Class in text form.*/
//const { set } = require(".");

 

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
      if(id < 0)  return false;
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
/*Object.defineProperties(Model, {
  id: { 
    get() {console.log("id-get"); return id;}, 
    set(id) {
      console.log("id-set")
      this.id = id;
      try {
        if(id < 0)  return;
        this.id = parseInt(id,10); 
        return true;}
      catch(err) {return false;}
    },
    enumerable: true,
    configurable: true
  },
  pProg: {
    enumerable: true,
    configurable: false
  },
  cProg: {
    enumerable: true,
    configurable: false
  }
});*/

class Programmer {
  // Class representing a Programmer device. 
  constructor(type="patient") {
    this.initDefaults(type);
    setInterval(() => {this.date.setSeconds(this.date.getSeconds()+1)},1000); // Increment date each second.
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
    this._groups = [new Group(),new Group(),new Group(),new Group()]; // List of Group settings.
    this._date = new Date(); // Current date.
    this._waitTime = 0;
    this._leads = []; // List of Lead settings.
    for (let g=0; g<this.groups.length; g++) {
      let gr = this.groups[g];
      for (let l=0; l<gr.getLeads().length; l++) { 
        let li = gr.getLeads()[l];
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
  set batteryLevel(p)  {if(typeof p == "number" && p >= 0.0 && p <= 1.0) this._batteryLevel = p;}
  get currentGroup()  {return this._currentGroup;}
  set currentGroup(g) {if(typeof g == "number" && g >= 0 && g <= this.groups.length - 1) this._currentGroup = Math.round(g);}
  get serialNo()  {return this._serialNo;}
  set serialNo(s) {if(typeof s == 'string' && /^[a-zA-Z]*[0-9]*$/.test(s))  this._serialNo = s;}
  get versionNo() {return this._versionNo;}
  set versionNo(v)  {if(typeof v == 'string' && /^([0-9]*(\.)){3}[0-9]*$/.test(v)) this._versionNo = v;}
  get manufacturerDate()  {return this._manufacturerDate;}
  set manufacturerDate(d) {if(d && Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d)) this._manufacturerDate = d;}
  get alerts()  {return this._alerts;}
  set alerts(a) {;}
  get stim()  {return this._stim;}
  set stim(d) {if(d && d instanceof Stimulator) this._stim = d;}
  get groups()  {return this._groups;}
  set groups(g) {;}
  get leads()  {return this._leads;}
  set leads(l) {;}
  get date()  {return this._date;}
  set date(d) {if(d && Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d)) this._date = d;}
  get waitTime()  {return this._waitTime;}
  set waitTime(w) {if(typeof w == "number" && w >= 0) this._waitTime = w;}

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
    s += `\nState: ${this.on ? "ON" : "OFF"} --- Hibernate: ${this.hibernate ? "ON" : "OFF"} --- curGroup: ${this.currentGroup} --- Date: ${this.date.toLocaleString()}`;
    s += `\nSerial #: ${this.serialNo} --- Software Version: ${this.versionNo} --- Manufacturer Date: ${this.manufacturerDate.toDateString()}`;
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
    this.password = "";
    this.key = "";
  }
  password;
  #key;
  impedenceInterval; // The frequency with which you want the system to measure lead impedance. 
  match(password) { // Checks if input password hash matches actual password hash.
    return;
  }

  get stimOffTime() {return this._stimOffTime;}
  set stimOffTime(a)  {if(typeof a == "number" && a >= 0) this._stimOffTime = a;}
  get rampDuration()  {return this._rampDuration;}
  set rampDuration(a)  {if(typeof a == "number" && a >= 0) this._rampDuration = a;}
  get doctor()  {return this._doctor;}
  set doctor(a) {if(a && a instanceof Doctor) this._doctor = a;}

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
  }

  get name()  {return this._name;}
  set name(a) {if(typeof a == 'string' && /\w*/.test(a)) this._name = a;}
  get imagePath() {return this._imagePath;}
  set imagePath(a)  {;}
  get SN()  {return this._SN;}
  set SN(a) {if(typeof a == 'string' && /^[a-zA-Z]*[0-9]*$/.test(a)) this._SN = a;}

// ADD MORE PARAMETERS FROM SPECS!

  getDataAsText() {
    let s = "\n";
    s += "Stimulator Name: " + this.name + ` --- Stimulator SN: ${this.SN}`;
    return s;
  }
}

class Group {
  static _gid = 0; // id counter. 
  static get gid()  {return Group._gid;}
  static set gid(a) {if(typeof a == "number" && a >= 0) Group._gid = a;}

  constructor(name="") {
    this.id = Group.gid++; 
    this.name = name;
    this.leads = [new Lead(),new Lead(),new Lead(),new Lead()];
  }  
  name;
  id; 
  imagePath; // Path to image file representing this stimulator.
  leads; // List of Lead settings.

  getID() {return this.id;}
  getLeads()  {return this.leads;}
  getDataAsText() {
    let s = "\n";
    s += `Group: ${this.name} (ID: ${this.id})\n`;
    s += this.leads.map(l => l.getDataAsText()).join("");
    return s;
  }
}

class Lead {
  // Class that represents stimulation settings for a Lead.
  static lid = 0; // id counter.
  constructor() {
    this.#id = Lead.lid++; 
    this.#on = false; this.#level = 0.0;
    this.#lotNumber = "100001"; this.#modelNumber = "MN10450";
    this.#targetName = "''"; this.#electrodes = ['+','-','N','N'];
    this.#impedeace = 65534; this.#location = "''"; this.#stepSize = randInt(1,3);
    this.#pulseAmplitude = 0; this.#maxAmplitude = 6000; this.#pulseWidth = 300; this.#pulseFrequency = 20;
    this.#anatomy = "Foot (arch)"; this.#strength = "Burning";
  }
  getDataAsText() {
    let s = "\n";
    s += "Lead ID: " + this.#id.toString(10);
    s += ` --- State: ${this.#on ? "ON" : "OFF"} --- Level: ${this.#level} --- Lot #: ${this.#lotNumber} --- Model #: ${this.#modelNumber}`;
    s += ` --- Target Name: ${this.#targetName} --- Anatomy: ${this.#anatomy} --- Strength: ${this.#strength}`;
    s += `\nElectrodes: [${this.#electrodes}] --- Impedance: ${this.#impedeace} Ω --- Location: ${this.#location}`;
    s += ` --- Pulse Amp: ${this.#pulseAmplitude}μA (max: ${this.#maxAmplitude}μA) --- Pulse Width: ${this.#pulseWidth}μs --- Pulse Freq: ${this.#pulseFrequency}Hz`;
    s += `--- Step Size: ${{1 : ">", 2 : ">>", 3 : ">>>"}[this.#stepSize]}`;
    return s;
  }  
  getID() {return this.#id;}

  #id;
  #on; // Lead on/off state.
  #level; // Lead intensity.
  #lotNumber; #modelNumber; 
  #targetName; // Body part to be targeted by Lead setting.
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
  title;
  name;
  id; // Person's id number assigned by institution. 
  phoneNumber; // A string in the format xxx-xxx-xxxx, with x being a digit. 
  address;
  notes; // Free form notes about the person.

  constructor(title = "", name = "", id = "", phoneNumber = "123-456-7890", address = "123 Axium Blvd.", notes = "") {
    this.setTitle(title); this.setName(name); this.setPhoneNumber(phoneNumber); this.address = address; this.notes = notes; this.id = id;
  }
  getTitle() {return this.title;} 
  setTitle(title) {
    if(typeof title === 'string' && /\w*/.test(title))  {
      this.title = title;
      return true;
    }
    return false;
  }
  getName() {return this.name;}
  setName(name) {
    if(typeof name === 'string' && /\w*/.test(name))  {
      this.name = name;
      return true;
    }
    return false;
  }
  getPhoneNumber()  {return this.phoneNumber;}
  setPhoneNumber(pNo) { 
    if(typeof pNo === 'string') {
      if(/\d{3}-\d{3}-\d{4}/.test(pNo))  {
        this.phoneNumber = pNo; 
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
  constructor(title = "Dr.", name = "Voja", id = "", phoneNumber = "098-765-4321", address = "456 Axium Blvd", notes = "",
    clinicName = "", clinicEMail = "info@spinalmodulation.com", clinicHistory = "") {
    super(title,name,id,phoneNumber,address,notes);
    this.clinicName = clinicName; this.clinicEMail = clinicEMail; this.clinicHistory = clinicHistory;
  }
  clinicName;
  clinicEMail;
  clinicHistory;

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