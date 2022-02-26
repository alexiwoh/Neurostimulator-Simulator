
/*getDataAsText() is a debug function that returns all variables of the Class in text form.*/ 

class Model {
  // Class that links multiple Programmer devices.
  #id;
  #pProg; // Patient programmer object.
  #cProg; // Clinician programmer object.
  constructor(id=0) {
    this.#id = id;
    this.#pProg = new PatientProgrammer();
    this.#cProg = new ClinicianProgrammer();
    Lead.lid = 0; Group.gid = 0;
  } 
  getID() {return this.#id;} 
  setID(id) {
    try {this.#id = parseInt(id,10); return true;}
    catch(err) {return false;}
  }
  // Prints all data as text.
  getDataAsText() {
    let s = "\n"
    s += "Model ID: " + this.getID().toString(10) + "\n------------\n";
    s += this.#pProg.getDataAsText() + "\n-----------\n" + this.#cProg.getDataAsText();
    return s;
  }
  init()  {}
}

class Programmer {
  // Class representing a Programmer device. 
  constructor(type="patient") {
    this.initDefaults(type);
    setInterval(() => {this.date.setSeconds(this.date.getSeconds()+1)},1000); // Increment date each second.
  }
  type; // Type of programmer: Patient or Clinician.
  on; // Programmer on/off state.
  hibernate; // Hibernation on/off state.
  batteryLevel; // Battery level of device.
  currentGroup; // Currently selected group setting.
  date; // Current date.
  serialNo; // Serial number.
  versionNo; // Version number.
  manufacturerDate; // Manufacturer date.
  alerts; // Array of strings.
  stim; // Stimulator.
  leads; // List of Lead settings.
  groups; // List of Group settings.
  waitTime; 
  

  initDefaults(type="patient")  {
    this.type = type; this.on = false; this.hibernate = false; this.batteryLevel = 1.0; this.currentGroup = randInt(0,3);
    this.serialNo = "SC1005"; this.versionNo = "5.0.2.0"; this.manufacturerDate = new Date("02-Apr-2014"); this.alerts = []; 
    this.stim = new Stimulator(); 
    this.groups = [new Group(),new Group(),new Group(),new Group()];
    this.date = new Date(); this.waitTime = 0;
    this.leads = [];
    for (let g=0; g<this.groups.length; g++) {
      let gr = this.groups[g];
      for (let l=0; l<gr.getLeads().length; l++) { 
        let li = gr.getLeads()[l];
        this.leads.push(li);
      }
    }
    
  }
  connectStimulator(stim) {}
  chargeDevice(amt) {}
  endAllSimulation() {}
  saveSettings(settings) {}
  exit() {}


  // Prints all data as text.
  getDataAsText() {
    let s = "\n";
    s += ((this.type.toLowerCase() in ["clinician", "patient"]) ? (`${this.type[0].toUpperCase() + this.type.substring(1)}`) : this.type);
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
    this.patient = patient; 
    this.serialNo = "CB0708";
  }
  patient;
}
class ClinicianProgrammer extends Programmer {
  constructor(doctor = new Doctor()) {
    super("clinician");
    this.#stimOffTime = 30; this.#rampDuration = 1;
    this.doctor = doctor;
  }
  doctor;
  #password;
  #key;
  #impedenceInterval; // The frequency with which you want the system to measure lead impedance. 
  #stimOffTime; // How long it takes (in seconds) before a magnet held over the device switches off delivered therapy.
  #rampDuration; // How long it takes (in seconds) for the NS to reach the requested amplitude.

  // Prints all data as text.
  getDataAsText() {
    let s = "";
    s += super.getDataAsText();
    s += `\nMagnet Stim off time: ${this.#stimOffTime}s --- Ramp Duration: ${this.#rampDuration}s`;
    return s;
  }
}

class Stimulator {
  // Class representing a Stimulator: INS or TNS. 
  constructor(name="Stimulator",imagePath="") {
    this.name = name; this.imagePath = imagePath; this.#SN = "CB0848";
  }
  #name;
  #SN; // Simulator serial number.
  #imagePath; // Path to image file representing this stimulator.

// ADD MORE PARAMETERS FROM SPECS!

  getDataAsText() {
    let s = "\n";
    s += "Stimulator Name: " + this.name + ` --- Stimulator SN: ${this.#SN}`;
    return s;
  }
}

class Group {
  static gid = 0; // id counter. 
  constructor(name="") {
    this.#id = Group.gid++; this.#name = name;
    this.#leads = [new Lead(),new Lead(),new Lead(),new Lead()];
  }  
  #name;
  #id; 
  #imagePath; // Path to image file representing this stimulator.
  #leads; // List of Lead settings.

  getID() {return this.#id;}
  getLeads()  {return this.#leads;}
  getDataAsText() {
    let s = "\n";
    s += `Group: ${this.#name} (ID: ${this.#id})\n`;
    s += this.#leads.map(l => l.getDataAsText()).join("");
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
    console.log(this.setName("ALex") + " " + this.setName(3));
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


module.exports = {Model};