class Model {
  #id;
  #pProg; // Patient programmer object.
  #cProg; // Clinician programmer object.
  constructor(id=0) {
    this.#id = id;
    this.#pProg = new PatientProgrammer();
    this.#cProg = new ClinicianProgrammer();
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
  constructor(type="patient") {
    this.type = type; this.on = false; this.batteryLevel = 1.0; this.currentGroup = null; this.date = null;
    this.serialNo = "0"; this.versionNo = "0"; this.manufacturerDate = null; this.alerts = []; 
    this.stim = new Stimulator(); this.leads = [new Lead(),new Lead(),new Lead(),new Lead()];
  }
  type; // Type of programmer: Patient or Clinician.
  on; // Programmer on/off state.
  batteryLevel; // Battery level of device.
  currentGroup; // Currently selected group setting.
  date; // Current date.
  serialNo; // Serial number.
  versionNo; // Version number.
  manufacturerDate; // Manufacturer date.
  alerts; // Array of strings.
  stim; // Stimulator.
  leads;

  // Prints all data as text.
  getDataAsText() {
    let s = "\n";
    s += ((this.type.toLowerCase() in ["clinician", "patient"]) ? (`${this.type[0].toUpperCase() + this.type.substring(1)}`) : this.type);
    s += this.stim.getDataAsText() + "\n";
    s += this.leads.map(l => l.getDataAsText()).join("");
    return s;
  }
}
class PatientProgrammer extends Programmer {
  constructor() {super("patient");}
}
class ClinicianProgrammer extends Programmer {
  constructor() {super("clinician");}
}

class Stimulator {
  constructor(name="Stimulator",imagePath="") {
    this.name = name; this.imagePath = imagePath;
  }
  #name;
  #imagePath; // Path to image file representing this stimulator.
  getDataAsText() {
    let s = "\n"
    s += "Stimulator: " + this.name;
    return s;
  }
}

class Lead {
  static lid = 0; 
  constructor() {
    this.#id = Lead.lid++; 
    this.#on = false; this.#level = 0.0;
    this.#lotNumber = "100001"; this.#modelNumber = "MN10450";
  }
  getDataAsText() {
    let s = "\n"
    s += "Lead ID: " + this.#id.toString(10);
    s += `, State: ${this.#on ? "ON" : "OFF"}, Level: ${this.#level}, Lot #: ${this.#lotNumber}, Model #: ${this.#modelNumber}`;
    return s;
  }  
  #id;
  #on; // Lead on/off state.
  #level; // Lead intensity.
  #lotNumber;
  #modelNumber;
}


module.exports = {Model};