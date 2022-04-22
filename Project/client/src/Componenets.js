/***                        ***/
/*** React App Components   ***/
/***                        ***/

import { useState, createContext, useContext, useEffect } from "react";
import "./Componenets.css";
import HumanBody from "./images/HumanBody.png";

const DEBUG = false;
const border = {border:"3px solid rgba(0, 0, 0, 0.0)"};
const curPageContext = createContext(); // Context for global states.
function pagename(s) {return s.toLowerCase().replace(/\s+/g,"").replace("-","");}; // Convert page name for parsing.

// Test page.
export default function TestPage(params)  {
  return (<></>);
}

// Test page for manually changing curPage values.
export function EnterPage() {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  return (DEBUG) ? (
      <>
        <div style={border}><div class="insideDiv"><fieldset>
          <legend>Current Page: "{curPage}"</legend>
          <input id="enter1" type="text" />
          <input type="button" value="Change" onClick={(e)=>setCurPage(document.getElementById("enter1").value)}/><br></br>
          <br></br>
        </fieldset></div></div> 
      </>
    ) : (<><div style={border}></div></>)
}

// Test page for manually changing curPage2 values.
export function EnterPage2() {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  return (DEBUG) ? (
      <>
        <div style={border}><div class="insideDiv"><fieldset>
          <legend>Current Page: "{curPage2}"</legend>
          <input id="enter2" type="text" />
          <input type="button" value="Change" onClick={(e)=>setCurPage2(document.getElementById("enter2").value)}/><br></br>
          <br></br>
        </fieldset></div></div> 
      </>
    ) : (<><div style={border}></div></>)
}

// Main Component for export.
export function AppComponents(params) {
  const [curPage, setCurPage] = useState("off"); // Current page for left device (Patient Programmer).
  const [curPage2, setCurPage2] = useState("off"); // Current page for right device (Clinical Programmer).
  const [refresh, setRefresh] = useState(false); // Facilitates refreshing of devices upon state change.
  
  return (
    <>
      <curPageContext.Provider value={{curPage, setCurPage, curPage2, setCurPage2, refresh, setRefresh}}>
        <div id="testDeviceBox" class="testDeviceBox">
          {(DEBUG) ? <EnterPage /> : (<></>)}
        </div>
        <div id="testDeviceBox2" class="testDeviceBox">
          {(DEBUG) ? <EnterPage2 /> : (<></>)}
        </div>
        <div>
          <div id="outerDeviceBox1" class="outerDeviceBox">
            <div id="deviceBox1" class="deviceBox">
              <Clock />
              <HomePage />
              <ProgrammerInfoPage />
              <GroupsPage />
              <Footer />
            </div>
            <h1 id="deviceName1" class="deviceName">Patient Programmer</h1>
          </div>
          <div id="outerDeviceBox2" class="outerDeviceBox">  
            <div id="deviceBox2" class="deviceBox">
              <Clock_C />
              <HomePage_C />
              <ProgrammerInfoPage_C />
              <Settings_C />
              <Footer_C />
            </div>
            <h1 id="deviceName2" class="deviceName">Clinical Programmer</h1> 
          </div>
        </div>
      </curPageContext.Provider>
      <Documentation />
    </>
  );
}

// Project Documentation to be displayed below the devices. 
export function Documentation()  {
  return (
  <>
    <div id="documentation" class="documentation" style={{"margin-left": "5%"}}>
      <h1> Neurostimulator Simulator </h1> 
      <h2> Based on the Axium Neurostimulator System – P150004 </h2>
      <h3>Summary</h3>
      <p>- The Patient Programmer device is on the left and the Clinical Programmer device is on the right.</p>
      <p>- Both devices can be turned on with the "Turn On/Off" button on the home page.</p>
      <p>- A device's battery (top-left) recharges when it is <span class="italics">Off</span> and discharges when it is on.</p>
      <p>- At any point press the "Exit" button to go to the home page and "Save Settings" to save entered values.</p>
      <p>- Clicking the "Program Settings" button to go the programmer information page.</p>
      <p class="p1">- In this page you can see device information and change the current date and time for the device.</p>
      <p class="p1">- You can also change which neurostimulator is connected to the device. Possible values are TNS, INS, and unbound.</p>
      <p>- The "Stimulation" button on the Patient Programmer allows you to change stimulation settings and see more specific health-related inforamtion.</p>
      <p class="p1">- Clicking the "Pain Control" tab allows you to select a stimulation group from the dropdown menu and change settings for the group's leads.</p>
      <p class="p2">- A lead can be selected by clicking one of the four sub tabs.</p>
      <p class="p2">- The "On/Off" button enables/disables the lead.</p>
      <p class="p2">- The "+/-" button increases/decreases the intensity of the lead stimulation.</p>
      <p class="p1">- Clicking the "My Info" tab allows you to see device, physician (doctor), and clinic-specific information by clicking their respective tabs.</p>
      <p>- The "Settings" button on the Clinical Programmer allows you to change stimulation settings and change more specific health-related inforamtion.</p>
      <p class="p1">- Clicking the "Profile" tab allows you to see patient, clinic, and system-specific information by clicking their respective sub tabs.</p>
      <p class="p2">- When a sub tab is selected you can edit the various parameters for the device.</p>
      <p class="p1">- Clicking the "Stim" tab allows you to select a stimulation group from the dropdown menu and change settings for the group's leads.</p>
      <p class="p2">- A lead can be selected by clicking one of the four sub tabs.</p>
      <p class="p2">- The "On/Off" button enables/disables the lead.</p>
      <p class="p2">- The "+/-" button increases/decreases the step size of the lead stimulation. This controls the rate of intensity increase on the Patient Programmer.</p>
      <p class="p2">- When lead settings are saved, the Patient Programmer restarts.</p>
    </div>
  </>)
}

// Test page for debugging purposes.
export function Page1(params)  {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  const [serialNo, setSerialNo] = useState("");
  useEffect(()=>{
    if(!matchPage) return;
    fetch("/api?classname=pprog&param=serialNo")
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setSerialNo(data.curValue)})
  }, [curPage]);

  function handleExit() {setCurPage("Page 1");}
  function matchPage()  {return curPage.toLowerCase().replace(/\s+/g,"") === "page1" || curPage.toLowerCase().replace(/\s+/g,"") === "all"}
  return (matchPage())
      ? (<>
        <div style={border}><div class="insideDiv"><fieldset>
          <legend>Current Page: "{curPage}"</legend>
          <form>
            <p>Serial Number: {serialNo}</p>
            <BottomButtons handleExit={handleExit} />
          </form>
          <br></br>   
        </fieldset></div></div>
      </>)
    : (<><div style={border}></div></>)
}

// Test page for debugging purposes.
export function Page2(params)  {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  const [name, setName] = useState("");
  useEffect(()=>{
    if(!matchPage) return;
    fetch("/api?classname=patient&param=name")
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setName(data.curValue)})
  }, [curPage]);

  function handleExit() {setCurPage("Page 2");}
  function matchPage()  {return curPage.toLowerCase().replace(/\s+/g,"") === "page2" || curPage.toLowerCase().replace(/\s+/g,"") === "all"}
  return (matchPage()) 
      ? (<>
        <div style={border}><div class="insideDiv"><fieldset>
          <legend>Current Page: "{curPage}"</legend>
          <form>
            <p>Patient Name: {name}</p>
            <BottomButtons handleExit={handleExit} />
          </form>
          <br></br>
          </fieldset></div></div>
      </>)
    : (<><div style={border}></div></>) 
}

// Test page for debugging purposes.
export function PageA(params)  {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  const [name, setName] = useState("");
  useEffect(()=>{
    if(!matchPage) return;
    fetch("/api?classname=patient&param=name")
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setName(data.curValue)})
  }, [curPage2]);

  function handleExit() {setCurPage2("Page A");}
  function matchPage()  {return curPage2.toLowerCase().replace(/\s+/g,"") === "pagea" || curPage2.toLowerCase().replace(/\s+/g,"") === "all"}
  return (matchPage())
      ? (<>
        <div style={border}><div class="insideDiv"><fieldset>
          <legend>Current Page: "{curPage2}"</legend>
          <form>
            <p>Patient Name: {name}</p>
          </form>
          <h1>To be finished ...</h1>
          <br></br>
          </fieldset>
          </div>
          {/*<BottomButtons handleExit={handleExit} />*/}
          </div>
      </>)
    : (<><div style={border}></div></>) 
}

/***                                              ***/
/*** PATIENT AND CLINICIAN PROGRAMMER COMPONENETS ***/
/***                                              ***/

/***     
 * The following functions are repeated in each function component:
 *                    
 * handleExit() handles events when the "Exit" button is pressed.
 * handleSave() or handleSubmit() handles events when the "Save Settings" button is pressed.
 * match() returns whether the currently selected page matches the necessary value for the Component to render.
 * 
 ***/

// Patient Programmer Info and settings page
export function ProgrammerInfoPage(params)  {
  const {curPage, setCurPage, curPage2, setCurPage2, refresh, setRefresh} = useContext(curPageContext);
  const [sNo, setSNo] = useState(""); const [vNo, setVNo] = useState(""); // States for serial number and version number.
  const [mDate, setMDate] = useState(""); // Manufacturer date.
  const [curDate, setCurDate] = useState(new Date()); // Date and time for the device.
  const [stim, setStim] = useState(""); // Current stiumlator type: TNS, INS, <unbounded>. 

  useEffect(()=>{
    if(!matchPage()) return;
    fetch("/api?classname=pprog&param=serialNo").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setSNo(data.curValue)})
    fetch("/api?classname=pprog&param=versionNo").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setVNo(data.curValue)})
    fetch("/api?classname=pprog&param=manufacturerDate").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setMDate(data.curValue)})
    fetch("/api?classname=pprog&param=date").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setCurDate(new Date(data.curValue))})
  }, [curPage]);

  useEffect(()=>{
    if(!matchPage()) return;
    fetch("/api?classname=pprog&param=stimType").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setStim(data.curValue)})
  },[refresh])

  function handleExit() {setCurPage("home");}
  function handleSave() {
    let d = new Date(document.getElementById("current-time-select").value);
    fetch("/api?classname=pprog&param=date", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: new Date(''+d.getFullYear(), ''+d.getMonth()-0, ''+d.getDate(), ''+d.getHours(), ''+d.getMinutes()).getTime() })
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setCurDate(new Date(data.curValue))})
    setCurPage("all"); setCurPage("pinfo");
  }  

  // Handles button to change stimulator type.
  function handleStim() {
    if(stim === "") setStim("TNS");
    else if (stim === "TNS") setStim("INS");
    else setStim("");

    fetch("/api?classname=pprog&param=stimType", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: 1 })
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data.curValue != undefined) {setStim(data.curValue)}})
    setRefresh(!refresh);
  }
  function matchPage()  {
    let word = curPage.toLowerCase().replace(/\s+/g,"").replace("-","");
    return  word === "pinfo" || word === "programmerinfo" || word === "all"
  }
  return (matchPage()) 
      ? (<>
        <div style={border}><div class="insideDiv">
          <fieldset>
          <legend>Programmer Information and Settings</legend>
          <form>
            <p>Serial Number: {sNo}</p>
            <p>Software Number: {vNo}</p>
            <p>Manufacturer Date: {mDate}</p>
            <input type="datetime-local" id="current-time-select" min="2000-01-01T00:00" max="2099-12-31T23:59" required/>
            <br></br>
          </form>
          <br></br>
          <button id="bind-stim-btn" class="full-btn" onClick={handleStim}> {(stim === "") ? "<unbound>" : stim}  </button>
          </fieldset>
          </div>
          <BottomButtons handleExit={handleExit} handleSave={handleSave} />
          </div>
      </>)
      : (<><div style={border}></div></>) 
}

// Clinical Programmer Info and settings page
export function ProgrammerInfoPage_C()  {
  const {curPage, setCurPage, curPage2, setCurPage2, refresh, setRefresh} = useContext(curPageContext);
  const [sNo, setSNo] = useState(""); const [vNo, setVNo] = useState(""); // States for serial number and version number.
  const [mDate, setMDate] = useState(""); // Manufacturer date.
  const [curDate, setCurDate] = useState(new Date()); // Date and time for the device.
  const [stim, setStim] = useState(""); // Current stiumlator type: TNS, INS, <unbounded>. 

  useEffect(()=>{
    if(!matchPage()) return;
    fetch("/api?classname=cprog&param=serialNo").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setSNo(data.curValue)})
    fetch("/api?classname=cprog&param=versionNo").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setVNo(data.curValue)})
    fetch("/api?classname=cprog&param=manufacturerDate").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setMDate(data.curValue)})
    fetch("/api?classname=cprog&param=date").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setCurDate(new Date(data.curValue))})
  }, [curPage2]);

  useEffect(()=>{
    if(!matchPage()) return;
    fetch("/api?classname=cprog&param=stimType").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setStim(data.curValue)})
  },[refresh])

  function handleExit() {setCurPage2("home");}
  function handleSave() {
    let d = new Date(document.getElementById("current-time-select-cprog").value);
    fetch("/api?classname=cprog&param=date", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: new Date(''+d.getFullYear(), ''+d.getMonth()-0, ''+d.getDate(), ''+d.getHours(), ''+d.getMinutes()).getTime() })
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setCurDate(new Date(data.curValue))})
    setCurPage2("all"); setCurPage2("pinfo");
  }  

  // Handles button to change stimulator type.
  function handleStim() {
    if(stim === "") setStim("TNS");
    else if (stim === "TNS") setStim("INS");
    else setStim("");

    fetch("/api?classname=cprog&param=stimType", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: 1 })
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data.curValue != undefined) {setStim(data.curValue)}})
    setRefresh(!refresh);
  }
  function matchPage()  {
    let word = curPage2.toLowerCase().replace(/\s+/g,"").replace("-","");
    return  word === "pinfo" || word === "programmerinfo" || word === "all"
  }
  return (matchPage()) 
      ? (<>
        <div style={border}><div class="insideDiv">
          <fieldset>
          <legend>Programmer Information and Settings</legend>
          <form>
            <p>Serial Number: {sNo}</p>
            <p>Software Number: {vNo}</p>
            <p>Manufacturer Date: {mDate}</p>
            <input type="datetime-local" id="current-time-select-cprog" min="2000-01-01T00:00" max="2099-12-31T23:59" required/>
            <br></br>
          </form>
          <br></br>
          <button id="bind-stim-btn-cprog" class="full-btn-c" onClick={handleStim}> {(stim === "") ? "<unbound>" : stim}  </button>
          </fieldset>
          </div>
          <BottomButtons handleExit={handleExit} handleSave={handleSave} />
          </div>
      </>)
      : (<><div style={border}></div></>) 
}

// Patient Programmer's ticking clock component. Also, handles some timed events.
export function Clock()  {
  const [date, setDate] = useState(new Date()); // Date and time for the device.
  const [battery, setBattery] = useState(1.0); // Battery level.
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);

  // Requests values periodically from the server.
  function fetchValues()  {
    fetch(`/api?classname=pprog&param=date`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setDate(new Date(data.curValue))})
    fetch(`/api?classname=pprog&param=batteryLevel`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setBattery(data.curValue)})
    fetch(`/api?classname=pprog&param=on`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) {
      if(data.curValue === false) setCurPage("off");
    }})
  }
  useEffect(()=>{
    const tid = setInterval(() => {
      fetchValues();
    }, 5000) 
    return () => {clearInterval(tid)};
  },[])
  useEffect(()=>{fetchValues();},[curPage])
  
  return (<>
  <div>
    <div id="clock-1" class="header" >
      <p style={{"margin-left":"3%", "float": "left", "width": "100%", "height": "20px"}}>
        <div style={{"display": "inline-block", "margin-left":"3%", "float": "left", "width": "25%"}}> {(battery*100).toFixed(0)}% <progress class="battery-bar" value={battery} max="1.0"></progress> </div> 
        <div style={{"display": "inline-block", "margin-left":"10%", "float":"left", "width" :"60%"}}>{date.toDateString()}, {date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</div>
      </p>
    </div>
  </div>
  </>)
}  

// Clinical programmer clock. 
// (See comments in the Clock Component above as this Component functions similarily)
export function Clock_C()  {
  const [date, setDate] = useState(new Date());
  const [battery, setBattery] = useState(1.0); // Battery level.
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  function fetchValues()  {
    fetch(`/api?classname=cprog&param=date`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setDate(new Date(data.curValue))})
    fetch(`/api?classname=cprog&param=batteryLevel`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setBattery(data.curValue)})
    fetch(`/api?classname=cprog&param=on`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) {
      if(data.curValue === false) setCurPage2("off");
    }})
  }
  useEffect(()=>{
    const tid = setInterval(() => {
      fetchValues();
    }, 5000) 
    return () => {clearInterval(tid)};
  },[])
  useEffect(()=>{fetchValues();},[curPage2])
  
  return (<>
  <div>
    <div id="clock-2" class="header" >
      <p style={{"margin-left":"3%", "float": "left", "width": "100%", "height": "20px"}}>
        <div style={{"display": "inline-block", "margin-left":"3%", "float": "left", "width": "25%"}}> {(battery*100).toFixed(0)}% <progress class="battery-bar" value={battery} max="1.0"></progress> </div> 
        <div style={{"display": "inline-block", "margin-left":"10%", "float":"left", "width" :"60%"}}>{date.toDateString()}, {date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</div>
      </p>
    </div>
  </div>
  </>)
}  

// Patient programmer footer.
export function Footer()  {
  const [id, setID] = useState(""); // Patient ID.
  const [SN, setSN] = useState(""); // Stimulator serial number.
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);

  // Fetches values periodically from the server.
  function fetchValues()  {
    fetch(`/api?classname=patient&param=id`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setID(data.curValue)})
    fetch(`/api?classname=pstim&param=SN`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setSN(data.curValue)})
  }
  useEffect(()=>{
    const tid = setInterval(() => {
      fetchValues();
    }, 5000) 
    return () => {clearInterval(tid)};
  },[])
  useEffect(()=>{fetchValues();},[curPage])
  
  return (<>
    <div>
      <div id="footer-1" class="footer" >
        <p style={{"margin-left":"3%", "float": "left", "width": "100%", "height": "20px"}}>
          <div style={{"display": "inline-block", "margin-left":"5%", "float": "left", "width": "40%"}}>ID: {id}</div> 
          <div style={{"display": "inline-block", "margin-left":"5%", "float":"left", "width" :"40%"}}>Stimulator {SN}</div>
        </p>
      </div>
    </div>
    </>)
}
// Clinical Programmer footer.
// (See comments in the Footer Component above as this Component functions similarily)
export function Footer_C()  {
  const [id, setID] = useState("");
  const [SN, setSN] = useState("");
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  function fetchValues()  {
    fetch(`/api?classname=doctor&param=id`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setID(data.curValue)})
    fetch(`/api?classname=cstim&param=SN`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setSN(data.curValue)})
  }
  useEffect(()=>{
    const tid = setInterval(() => {
      fetchValues();
    }, 5000) 
    return () => {clearInterval(tid)};
  },[])
  useEffect(()=>{fetchValues();},[curPage2])
  
  return (<>
    <div>
      <div id="footer-1" class="footer" >
        <p style={{"margin-left":"3%", "float": "left", "width": "100%", "height": "20px"}}>
          <div style={{"display": "inline-block", "margin-left":"5%", "float": "left", "width": "40%"}}>ID: {id}</div> 
          <div style={{"display": "inline-block", "margin-left":"5%", "float":"left", "width" :"40%"}}>Stimulator {SN}</div>
        </p>
      </div>
    </div>
    </>)
}

// Patient Programmer home page component.
export function HomePage() {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);

  // Handles events when On/Off button is pressed.
  function handleOnOff()  {
    let data = (pagename(curPage) === "off") ? true : false;
    fetch(`/api?classname=pprog&param=on`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: data })  
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) {
      if(data.curValue) setCurPage("home");
      else setCurPage("off");
    }})
  }
  function matchPage()  {
    let word = pagename(curPage);
    return  word === "off" || word === "home" || word === "homepage" || word === "all";
  }
  return (matchPage()) ? (<>
    <div id="home-pane" class="home-pane"> 
      <button id="turn-off-btn" class="home-pane-btn full-btn-special" onClick={handleOnOff}> 
        TURN {(pagename(curPage) === "off") ? "ON" : "OFF"}  
      </button>
      {(pagename(curPage) === "off") ? (<></>) : (<>
      <button id="prog-set-btn" class="home-pane-btn full-btn" onClick={(e)=>{setCurPage("pinfo")}}> Program Settings </button>
      <button id="stim-btn" class="home-pane-btn full-btn" onClick={(e)=>{setCurPage("groups")}}> Stimulation </button>
      </>)}
    </div>
  </>) : (<></>)
}

// Clinical Programmer home page component.
// (See comments in the HomePage Component above as this Component functions similarily)
export function HomePage_C() {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  function handleOnOff()  {
    let data = (pagename(curPage2) === "off") ? true : false;
    fetch(`/api?classname=cprog&param=on`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: data })  
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) {
      if(data.curValue) setCurPage2("home");
      else setCurPage2("off");
    }})
  }
  function matchPage()  {
    let word = pagename(curPage2);
    return  word === "off" || word === "home" || word === "homepage" || word === "all";
  }
  return (matchPage()) ? (<>
    <div id="home-pane" class="home-pane"> 
      <button id="turn-off-btn-2" class="home-pane-btn full-btn-special" onClick={handleOnOff}> 
        TURN {(pagename(curPage2) === "off") ? "ON" : "OFF"}  
      </button>
      {(pagename(curPage2) === "off") ? (<></>) : (<>
      <button id="cprog-set-btn" class="home-pane-btn full-btn-c" onClick={(e)=>{setCurPage2("pinfo")}}> Program Settings </button>
      <button id="cstim-btn" class="home-pane-btn full-btn-c" onClick={(e)=>{setCurPage2("settings")}}> Settings </button>
      </>)}
    </div>
  </>) : (<></>)
}

// Patient Programmer: Pages for Group and lead settings and device information.
export function GroupsPage() {
  const {curPage, setCurPage, curPage2, setCurPage2, refresh, setRefresh} = useContext(curPageContext);
  const [curSubpage, setCurSubPage] = useState("pain-control"); // Currently selected tab.
  const [curSubpage2, setCurSubPage2] = useState("device"); // Currently selected sub tab. 
  const [curGroupID, setCurGroupID] = useState(0); // Array index of currently selected Group.
  const [curLeadID, setCurLeadID] = useState(0); // Array index of currently selected Lead.
  const [groupData, setGroupData] = useState({
    groupNames : ['0','1','2','3','4','5','6','7'],
    groupIDs: [0,1,2,3,4,5,6,7],
    leadNames : ['0','1','2','3'],
    leadIDs: [0,1,2,3],
    curGroup: 0,
    curLead: 0,
    leadInfo: {
      "on": false,
      "level": "0",
      "target": "",
      "sendable": true,
      "id": 0,
      "index": 0,
      "stepSize": 0.05
    }
  }); // Data pertaining to currently selected group and lead.
  const [data, setData] = useState({
    stimVersion: "-",
    stimVoltage: "-",
    implantDate: new Date(),
    pName: "-",
    pTitle: "Dr. ",
    phone: "-",
    email: "-",
    cName: "-",
    address: "-",
    contact: "-"
  }); // Clinical, patient and doctor information to be displayed.

  useEffect(()=>{
    if (!matchPage()) return;
    if (curSubpage === "my-info")  { // Fetches data for My-info page.
      if(curSubpage2 === "device")  { // Fetches data for Device tab.
        fetch("/api?classname=pstim&param=versionNo").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, stimVersion: data.curValue}
        })});
        fetch("/api?classname=pstim&param=voltage").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, stimVoltage: data.curValue}
        })});
        fetch("/api?classname=pstim&param=implantDate").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, implantDate: new Date(data.curValue)}
        })});
      } else if (curSubpage2 === "physician") { // Fetches data for Physician tab.
        fetch("/api?classname=doctor&param=name").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, pName: data.curValue}
        })});
        fetch("/api?classname=doctor&param=title").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, pTitle: data.curValue + " "}
        })});
        fetch("/api?classname=doctor&param=phoneNumber").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, phone: data.curValue}
        })});
        fetch("/api?classname=doctor&param=email").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, email: data.curValue}
        })});
      } else if (curSubpage2 === "clinic") { // Fetches data for Clinic tab.
        fetch("/api?classname=doctor&param=clinicName").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, cName: data.curValue}
        })});
        fetch("/api?classname=doctor&param=address").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, address: data.curValue}
        })});
        fetch("/api?classname=doctor&param=phoneNumber").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, contact: data.curValue}
        })});
      }
    } else if (curSubpage === "pain-control")  { // Fetches data for Pain Control page.
        fetch("/api?classname=pprog&param=groupData").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
          return {...prev, groupIDs: data.curValue.groupIDs, groupNames: data.curValue.groups, curGroup: data.curValue.currentGroup, leadNames: data.curValue.targets}
        })}); 
    }
  },[curPage, curSubpage, curSubpage2, refresh])

  // Updates GUI when selected lead changes.
  useEffect(()=>{
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=group&param=leadIndex&id=${curGroupID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: curLeadID })
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) {setGroupData(prev => {return {...prev, curLead: data.curValue}})}});

    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
  },[curLeadID, curSubpage, curPage, refresh])

  // Updates GUI when selected group changes.
  useEffect(()=>{
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=pprog&param=currentGroup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: curGroupID })
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) {setGroupData(prev => {return {...prev, curGroup: data.curValue}})}});
    fetch("/api?classname=pprog&param=groupData").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, groupIDs: data.curValue.groupIDs, groupNames: data.curValue.groups, leadNames: data.curValue.targets}
    })});
    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
  },[curGroupID, curSubpage, curPage, refresh])

  // Handles the On/Off button for the selected lead. 
  function toggleOn() {
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=lead&param=on&id=${groupData.leadInfo.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: !groupData.leadInfo.on })
    })
    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
    setRefresh(!refresh);
  }

  // Handles the +/- buttons for the selected lead. 
  function changeLevel(amount)  {
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=lead&param=level&id=${groupData.leadInfo.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'relative', setValue: amount * groupData.leadInfo.stepSize })
    })

    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
    setRefresh(!refresh);
  }  

  // Sets a selected button to 'active' wheere it is then highlighted. 
  function setActive(event)  {
    let buttons = document.getElementById(event.target.parentElement.id).getElementsByClassName(event.target.className);
    // Loop through buttons and remove 'active' class name.
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" active", "");
    }
    // Make this button 'active'.
    document.getElementById(event.target.id).className +=  " active";
  }

  // Handles the "Turn Off All Simulation" button.
  function turnOffAllSimulation() {
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=pprog&param=turnOffAllStimulation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: true })  
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) {if(data.curValue) {setCurSubPage("my-info"); setCurSubPage("pain-control");}}})

    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
    setRefresh(!refresh);
  }

  // Returns JSX for "My Info" page and its tabs.
  function getMyInfo()  {
    let innerJSX = (<></>);
    if(curSubpage !== "my-info") return innerJSX; 
    if(curSubpage2 === "device")  {
      innerJSX = (<>
        <div>
          <p>Stimulator FW Version: {data.stimVersion}</p>
          <p>Stimulator Voltage: {data.stimVoltage}</p>
          <p>Implant Date: {data.implantDate.toDateString()}</p>
        </div>
      </>);
    }
    if(curSubpage2 === "physician")  {
      innerJSX = (<>
        <div>
          <p>Name:  {data.pTitle} {data.pName}</p>
          <p>Phone: {data.phone}</p>
          <p>Email: {data.email}</p>
        </div>
      </>);
    }
    if(curSubpage2 === "clinic")  {
      innerJSX = (<>
        <div>
          <p>Name: {data.cName}</p>
          <p>Address: {data.address}</p>
          <p>Contact: {data.contact}</p>
        </div>
      </>);
    }
    return (curSubpage === "my-info") ? (<>
      <div>
      <fieldset>
        <legend>
          <div id="myinfo-pane" class="groups-tab tab"> 
            <button id="device-info-button" class={`info-pane-button ${(curSubpage2 === "device") ? "active" : ""}`} onClick={(e)=>{setCurSubPage2("device"); setCurPage("groups"); setActive(e);}}>     Device        </button>
            <button id="physician-info-button" class={`info-pane-button ${(curSubpage2 === "physician") ? "active" : ""}`} onClick={(e)=>{setCurSubPage2("physician"); setCurPage("groups"); setActive(e);}}>  Physician     </button>
            <button id="clinic-info-button" class={`info-pane-button ${(curSubpage2 === "clinic") ? "active" : ""}`} onClick={(e)=>{setCurSubPage2("clinic"); setCurPage("groups"); setActive(e);}}>     Clinic        </button>
          </div>
        </legend>
        {innerJSX}
      </fieldset>
      </div>
    </>) : (<></>)
  } 

  // Returns JSX for "Pain Control" page and its tabs.
  function getPainControl()  {
    return (curSubpage === "pain-control") ? (<>
      <div>
        <div class="group-select">
          <select name="group-selector" id="group-selector" onChange={(e)=>{setCurGroupID(Number(e.target.value));}}>
            {(()=>{
                let gr = [];
                let gi = groupData.groupIDs;
                let gn = groupData.groupNames;
                for(let i=0; i< gi.length; i++) gr.push((curGroupID != gi[i]) ? (<option value={gi[i]}> {gn[i]} </option>) : (<option value={gi[i]} selected="selected"> {gn[i]} </option>));
                return gr;
              })()}
          </select>
        </div>
        <br></br>
        <fieldset>
          <legend>
            <div id="paincontrol-pane" class="groups-tab tab"> 
              { (groupData.groupNames.length > 0) ? 
                (<>
                  <button id="lead-button-0" class={`info-pane-button ${(groupData.leadInfo.index === 0) ? "active" : ""}`} onClick={(e)=>{setCurLeadID(0); setCurSubPage2("lead-0"); setCurPage("groups"); setActive(e);}}>{groupData.leadNames[0]} </button>
                  <button id="lead-button-1" class={`info-pane-button ${(groupData.leadInfo.index === 1) ? "active" : ""}`} onClick={(e)=>{setCurLeadID(1); setCurSubPage2("lead-1"); setCurPage("groups"); setActive(e);}}>{groupData.leadNames[1]} </button>
                  <button id="lead-button-2" class={`info-pane-button ${(groupData.leadInfo.index === 2) ? "active" : ""}`} onClick={(e)=>{setCurLeadID(2); setCurSubPage2("lead-2"); setCurPage("groups"); setActive(e);}}>{groupData.leadNames[2]} </button>
                  <button id="lead-button-3" class={`info-pane-button ${(groupData.leadInfo.index === 3) ? "active" : ""}`} onClick={(e)=>{setCurLeadID(3); setCurSubPage2("lead-3"); setCurPage("groups"); setActive(e);}}>{groupData.leadNames[3]} </button>
                </>)
                : (<></>)
              }
            </div>
          </legend>
          <div>
            <div class="up-dn-pane">
              <button class="on-btn" onClick={toggleOn} style={{"animation":(groupData.leadInfo.on) ? "on-blink 1.0s infinite" : "none"}}>{(groupData.leadInfo.on) ? "ON" : "OFF"}</button>
              <button class="up-dn-btn" onClick={()=>{changeLevel(-1)}}  style={{"animation":(groupData.leadInfo.on) ? "on-blink 1.0s infinite" : "none"}}> - </button>
              <button class="up-dn-btn" onClick={()=>{changeLevel(1)}}   style={{"animation":(groupData.leadInfo.on) ? "on-blink 1.0s infinite" : "none"}}> + </button>
              <div style={{"width":"15%", "display": "inline-block", "text-align": "center"}}> {(groupData.leadInfo.level*100).toFixed(0)}% </div>
              <progress id="level-bar" class="battery-bar" value={groupData.leadInfo.level} max="1.0" style={{"margin-left": "1%"}}></progress>
            </div>
          </div>
        </fieldset>
        <button class="all-off-btn" onClick={turnOffAllSimulation}> Turn Off All Stimulation </button>
      </div>
    </>) : (<></>)
  }

  function handleExit() {setCurPage("home");}
  function matchPage()  {
    let word = curPage.toLowerCase().replace(/\s+/g,"").replace("-","");
    return  word === "groups" || word === "groupspage" || word === "all";
  }

  return (matchPage()) 
  ? (<>
    <fieldset>
    <legend>
      <div id="groups-pane" class="groups-tab tab"> 
        <button id="pain-control-button" class={`group-pane-button ${(curSubpage === "pain-control") ? "active" : ""}`} onClick={(e)=>{setCurSubPage("pain-control"); setCurPage("groups"); setActive(e);}}> Pain Control  </button>
        <button id="my-info-button" class={`group-pane-button ${(curSubpage === "my-info") ? "active" : ""}`} onClick={(e)=>{setCurSubPage("my-info"); setCurPage("groups"); setActive(e);}}>      My Info       </button>
      </div>
    </legend>
    {getMyInfo()}
    {getPainControl()}
    </fieldset>
    <BottomButtons handleExit={handleExit} />
  </>) : (<></>)
}

// Clinical Programmer: Pages for Group, lead, device, and personal inforamtion settings.
// (See comments in the GroupsPage Component above as this Component functions similarily)
export function Settings_C()  {
  const {curPage, setCurPage, curPage2, setCurPage2, refresh, setRefresh} = useContext(curPageContext);
  const [curSubpage, setCurSubPage] = useState("profile");
  const [curSubpage2, setCurSubPage2] = useState("patient");
  const [curGroupID, setCurGroupID] = useState(0);
  const [curLeadID, setCurLeadID] = useState(0);
  const [groupData, setGroupData] = useState({
    groupNames : ['0','1','2','3','4','5','6','7'],
    groupIDs: [0,1,2,3,4,5,6,7],
    leadNames : ['0','1','2','3'],
    leadIDs: [0,1,2,3],
    curGroup: 0,
    curLead: 0,
    leadInfo: {
      "on": false,
      "level": "0",
      "target": "",
      "sendable": true,
      "id": 0,
      "index": 0,
      "stepSize": 0.05,
      "anatomy": "-",
      "strength": "-"
    }
  }); 
  const [data, setData] = useState({
    stimVersion: "",
    stimVoltage: "",
    implantDate: new Date(),
    pName: "-",
    pID: "-",
    pDOB: new Date(),
    pNotes: "Type note here...",
    dName: "-",
    dID: "-",
    dTitle: "Dr. ",
    phone: "-",
    email: "-",
    cName: "-",
    address: "-",
    phone: "-",
    impedance: 6,
    stimOff: 30,
    rampDuration: 1,
    followUp: 4
  });

  useEffect(()=>{
    if (!matchPage()) return;
    if (curSubpage === "profile")  {
      if(curSubpage2 === "patient")  {
        fetch("/api?classname=patient&param=name").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, pName: data.curValue}
        })});
        fetch("/api?classname=patient&param=id").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, pID: data.curValue}
        })});
        fetch("/api?classname=patient&param=dob").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, pDOB: new Date(data.curValue)}
        })});
        fetch("/api?classname=patient&param=notes").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, pNotes: data.curValue}
        })});
      }
      if(curSubpage2 === "clinic")  {
        fetch("/api?classname=doctor&param=name").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, dName: data.curValue}
        })});
        fetch("/api?classname=doctor&param=clinicName").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, cName: data.curValue}
        })});
        fetch("/api?classname=doctor&param=phoneNumber").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, phone: data.curValue}
        })});
        fetch("/api?classname=doctor&param=email").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, email: data.curValue}
        })});
        fetch("/api?classname=doctor&param=address").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, address: data.curValue}
        })});
      }
      if(curSubpage2 === "NS" || curSubpage2 === "system") {
        fetch("/api?classname=cstim&param=implantDate").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, implantDate: new Date(data.curValue)}
        })});
        fetch("/api?classname=cstim&param=versionNo").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, stimVersion: data.curValue}
        })});
        fetch("/api?classname=cstim&param=voltage").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, stimVoltage: data.curValue}
        })});
        fetch("/api?classname=cprog&param=impedanceInterval").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, impedance: data.curValue}
        })});
        fetch("/api?classname=cprog&param=followUpPeriod").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, followUp: data.curValue}
        })});
        fetch("/api?classname=cprog&param=stimOffTime").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, stimOff: data.curValue}
        })});
        fetch("/api?classname=cprog&param=rampDuration").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setData(prev => {
          return {...prev, rampDuration: data.curValue}
        })});
      }
    } else if (curSubpage === "pain-control")  {
      fetch("/api?classname=pprog&param=groupData").then((res) => {return res.json()})
      .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
        return {...prev, groupIDs: data.curValue.groupIDs, groupNames: data.curValue.groups, curGroup: data.curValue.currentGroup, leadNames: data.curValue.targets}
      })}); 
    }
  }, [curPage2, curSubpage, curSubpage2, refresh]);

  // Updates GUI when selected lead changes.
  useEffect(()=>{
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=group&param=leadIndex&id=${curGroupID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: curLeadID })
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) {setGroupData(prev => {return {...prev, curLead: data.curValue}})}});

    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
  },[curLeadID, curSubpage, curPage2, refresh])

  // Updates GUI when selected group changes.
  useEffect(()=>{
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=pprog&param=currentGroup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: curGroupID })
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) {setGroupData(prev => {return {...prev, curGroup: data.curValue}})}});
    fetch("/api?classname=pprog&param=groupData").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, groupIDs: data.curValue.groupIDs, groupNames: data.curValue.groups, leadNames: data.curValue.targets}
    })});
    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
  },[curGroupID, curSubpage, curPage2, refresh])

  function toggleOn() {
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=lead&param=on&id=${groupData.leadInfo.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: !groupData.leadInfo.on })
    })
    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
    setRefresh(!refresh);
  }

  // Handles events when +/- buttons are pressed.
  function changeStepSize(amount)  {
    
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=lead&param=stepSize&id=${groupData.leadInfo.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'relative', setValue: amount })
    })

    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
    setRefresh(!refresh);
  }  

  function turnOffAllSimulation() {
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=cprog&param=turnOffAllStimulation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: true })  
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) {if(data.curValue) {setCurSubPage("pain-control");}}})

    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
    setRefresh(!refresh);
  }

  function getPainControl()  {
    return (curSubpage === "pain-control") ? (<>
      <div>
        <div class="group-select">
          <select name="group-selector" id="group-selector-C" onChange={(e)=>{setCurGroupID(Number(e.target.value));}}>
            {(()=>{
                let gr = [];
                let gi = groupData.groupIDs;
                let gn = groupData.groupNames;
                for(let i=0; i< gi.length; i++) gr.push((curGroupID != gi[i]) ? (<option value={gi[i]}> {gn[i]} </option>) : (<option value={gi[i]} selected="selected"> {gn[i]} </option>));
                return gr;
              })()}
          </select>
        </div>
        <br></br>
        <fieldset>
          <legend>
            <div id="paincontrol-pane-C" class="groups-tab-cprog tab"> 
              { (groupData.groupNames.length > 0) ? 
                (<>
                  <button id="lead-button-0-C" class={`info-pane-button ${(groupData.leadInfo.index === 0) ? "active" : ""}`} onClick={(e)=>{setCurLeadID(0); setCurSubPage2("lead-0"); setCurPage2("settings"); setActive(e);}}>{groupData.leadNames[0]} </button>
                  <button id="lead-button-1-C" class={`info-pane-button ${(groupData.leadInfo.index === 1) ? "active" : ""}`} onClick={(e)=>{setCurLeadID(1); setCurSubPage2("lead-1"); setCurPage2("settings"); setActive(e);}}>{groupData.leadNames[1]} </button>
                  <button id="lead-button-2-C" class={`info-pane-button ${(groupData.leadInfo.index === 2) ? "active" : ""}`} onClick={(e)=>{setCurLeadID(2); setCurSubPage2("lead-2"); setCurPage2("settings"); setActive(e);}}>{groupData.leadNames[2]} </button>
                  <button id="lead-button-3-C" class={`info-pane-button ${(groupData.leadInfo.index === 3) ? "active" : ""}`} onClick={(e)=>{setCurLeadID(3); setCurSubPage2("lead-3"); setCurPage2("settings"); setActive(e);}}>{groupData.leadNames[3]} </button>
                </>)
                : (<></>)
              }
            </div>
          </legend>
          <div>
            <div class="up-dn-pane-cprog data-cprog">
              <button class="on-btn" onClick={toggleOn} style={{"animation":(groupData.leadInfo.on) ? "on-blink-C 1.0s infinite" : "none"}}>{(groupData.leadInfo.on) ? "ON" : "OFF"}</button>
              <label style={{"margin-left":"10px"}}>Step Size:</label>
              <button class="up-dn-btn" onClick={()=>{changeStepSize(-1)}}  style={{"margin-left":"10px","animation":(groupData.leadInfo.on) ? "on-blink-C 1.0s infinite" : "none"}}> - </button>
              <div style={{"width":"15%", "display": "inline-block", "text-align": "center"}}> {(groupData.leadInfo.stepSize * 100).toFixed(0)}% </div>
              <button class="up-dn-btn" onClick={()=>{changeStepSize(1)}}   style={{"animation":(groupData.leadInfo.on) ? "on-blink-C 1.0s infinite" : "none"}}> + </button>
              <div> <label style={{"width":"30%", "display":"inline-block"}}> Group name: </label> <input id="groupNameBox" type="text" placeholder={groupData.groupNames[groupData.curGroup]}/> </div>
              <div> <label style={{"width":"30%", "display":"inline-block"}}> Lead name: </label> <input id="leadNameBox" type="text" placeholder={groupData.leadNames[groupData.leadInfo.index]} /> </div>
              <div> <label style={{"width":"30%", "display":"inline-block"}}> Anatomy: </label> <input id="anatomyBox" type="text" placeholder={groupData.leadInfo.anatomy}/> </div>
              <div> <label style={{"width":"30%", "display":"inline-block"}}> Strength: </label> <input id="strengthBox" type="text" placeholder={groupData.leadInfo.strength}/> </div>
            </div>
          </div>
        </fieldset>
        <button class="all-off-btn" onClick={turnOffAllSimulation}> Turn Off All Stimulation </button>
      </div>
    </>) : (<></>)
  }

  function getProfile() {
    let innerJSX = (<></>);
    if(curSubpage !== "profile") return innerJSX;
    if(curSubpage2 === "patient")  {
      innerJSX = (<>
        <div class="data-cprog">
          <fieldset> <legend> Patient Information </legend>
            <div> <label style={{"width":"20%", "display":"inline-block"}}> Name: </label> <input id="pName" type="text" placeholder={data.pName}/> </div>
            <div> <label style={{"width":"20%", "display":"inline-block"}}> ID: </label> <input id="pID" type="text" placeholder={data.pID}/> </div>
            <div> <label style={{"width":"20%", "display":"inline-block"}}> DOB: </label> <input id="pDOB" type="text" placeholder={data.pDOB.toDateString()}/> </div>
          </fieldset>
          <fieldset> <legend> Notes </legend> <textarea id="notesBox" placeholder={data.pNotes} rows="3" cols="50"></textarea> </fieldset>
        </div>
      </>);
    }
    if(curSubpage2 === "clinic")  {
      innerJSX = (<>
        <div class="data-cprog">
          <fieldset> <legend> Clinic Information </legend>
            <div> <label style={{"width":"40%", "display":"inline-block"}}> Doctor Name: </label> <input id="dName" type="text" placeholder={data.dName}/> </div>
            <div> <label style={{"width":"40%", "display":"inline-block"}}> Clinic Name: </label> <input id="cName" type="text" placeholder={data.cName}/> </div>
            <div> <label style={{"width":"40%", "display":"inline-block"}}> Phone: </label> <input id="cPhone" type="text" placeholder={data.phone}/> </div>
            <div> <label style={{"width":"40%", "display":"inline-block"}}> Email: </label> <input id="cEmail" type="text" placeholder={data.email}/> </div>
            <div> <label style={{"width":"40%", "display":"inline-block"}}> Address: </label> <input id="cAddress" type="text" placeholder={data.address}/> </div>
          </fieldset>
        </div>
      </>);
    }
    if(curSubpage2 === "NS" || curSubpage2 === "system")  {
      innerJSX = (<>
        <div class="data-cprog">
          <fieldset> <legend> Stimulator Information </legend>
            <div> <label style={{"width":"40%", "display":"inline-block"}}> Implant Date: </label> <input id="implantDate" type="text" placeholder={data.implantDate.toDateString()}/> </div>
            <div> <label style={{"width":"40%", "display":"inline-block"}}> Version: </label> <label id="sVersion"> {data.stimVersion} </label> </div>
            <div> <label style={{"width":"40%", "display":"inline-block"}}> Voltage: </label> <label id="sVoltage"> {data.stimVoltage} </label> </div>
          </fieldset>
          <fieldset> <legend> System </legend> 
          <div> <label style={{"width":"69%", "display":"inline-block"}}> Periodic Impedance Interval: </label> <input id="sImpedance" class="smallBox" placeholder={data.impedance} /><label>hours</label> </div>
          <div> <label style={{"width":"69%", "display":"inline-block"}}> Follow-Up Period: </label> <input id="sFollowUp" class="smallBox" placeholder={data.followUp} /><label>weeks</label> </div>
          <div> <label style={{"width":"69%", "display":"inline-block"}}> Stim Off Time: </label> <input id="sStimOff" class="smallBox" placeholder={data.stimOff} /><label>secs</label> </div>
          <div> <label style={{"width":"69%", "display":"inline-block"}}> Ramp Duration: </label> <input id="sRamp" class="smallBox" placeholder={data.rampDuration} /><label>secs</label> </div>
          </fieldset>
        </div>
      </>);
    }

    return (curSubpage === "profile") ? (<>
      <div>
        <fieldset>
          <legend>
            <div id="profile-pane-cprog" class="groups-tab-cprog tab"> 
              <button id="patient-info-button-cprog" class={`profile-pane-button-cprog ${(curSubpage2 === "patient") ? "active" : ""}`} onClick={(e)=>{setCurSubPage2("patient"); setCurPage2("settings"); setActive(e);}}>     Patient        </button>
              <button id="clinic-info-button-cprog" class={`profile-pane-button-cprog ${(curSubpage2 === "clinic") ? "active" : ""}`} onClick={(e)=>{setCurSubPage2("clinic"); setCurPage2("settings"); setActive(e);}}>  Clinic     </button>
              <button id="ns-info-button-cprog" class={`profile-pane-button-cprog ${(curSubpage2 === "NS" || curSubpage2 === "system") ? "active" : ""}`} onClick={(e)=>{setCurSubPage2("NS"); setCurPage2("settings"); setActive(e);}}>  NS/System     </button>
            </div>
          </legend>
          {innerJSX}
        </fieldset>
      </div>
    </>) : (<></>)
  }

  function setActive(event)  {
    let buttons = document.getElementById(event.target.parentElement.id).getElementsByClassName(event.target.className);
    // Loop through buttons and remove 'active' class name.
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" active", "");
    }
    // Make this button 'active'.
    document.getElementById(event.target.id).className +=  " active";
  }
  
  function handleSubmit() {
    if(!matchPage())  return;
    if (curSubpage === "profile")  {
      if(curSubpage2 === "patient") {
        fetch("/api?classname=patient&param=name", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("pName").value })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, pName: data.curValue}}); } });
        fetch("/api?classname=patient&param=id", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("pID").value })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, pID: data.curValue}}); } });
        fetch("/api?classname=patient&param=dob", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("pDOB").value })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, pDOB: new Date(data.curValue)}}); } });
        fetch("/api?classname=patient&param=notes", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("notesBox").value })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, pNotes: data.curValue}}); } });
        document.getElementById("pName").value = "";
        document.getElementById("pID").value = "";
        document.getElementById("pDOB").value = "";
        document.getElementById("notesBox").value = "";
      }
      if(curSubpage2 === "clinic")  {
        fetch("/api?classname=doctor&param=name", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("dName").value })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, dName: data.curValue}}); } });
        fetch("/api?classname=doctor&param=clinicName", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("cName").value })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, cName: data.curValue}}); } });
        fetch("/api?classname=doctor&param=phoneNumber", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("cPhone").value })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, phone: data.curValue}}); } });
        fetch("/api?classname=doctor&param=email", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("cEmail").value })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, email: data.curValue}}); document.getElementById("cEmail").value = "";} });
        fetch("/api?classname=doctor&param=address", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("cAddress").value })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, address: data.curValue}}); } });
        document.getElementById("dName").value = "";
        document.getElementById("cName").value = "";
        document.getElementById("cPhone").value = "";
        document.getElementById("cAddress").value = "";
      }
      if(curSubpage2 === "NS" || curSubpage2 === "system")  {
        fetch("/api?classname=cstim&param=implantDate", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("implantDate").value })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, implantDate: new Date(data.curValue)}}); document.getElementById("implantDate").value = "";} });
        fetch("/api?classname=cprog&param=impedanceInterval", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: Number(document.getElementById("sImpedance").value) })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, impedance: data.curValue}}); } });
        fetch("/api?classname=cprog&param=followUpPeriod", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: Number(document.getElementById("sFollowUp").value) })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, followUp: data.curValue}}); } });
        fetch("/api?classname=cprog&param=stimOffTime", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: Number(document.getElementById("sStimOff").value) })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, stimOff: data.curValue}}); } });
        fetch("/api?classname=cprog&param=rampDuration", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: Number(document.getElementById("sRamp").value) })})
        .then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setData(prev => {return {...prev, rampDuration: data.curValue}}); } });
        document.getElementById("sImpedance").value = "";
        document.getElementById("sFollowUp").value = "";
        document.getElementById("sStimOff").value = "";
        document.getElementById("sRamp").value = "";
      }
    }
    if(curSubpage === "pain-control") {
      fetch(`/api?classname=lead&param=targetName&id=${groupData.leadInfo.id}`, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("leadNameBox").value })})
      fetch(`/api?classname=group&param=name&id=${curGroupID}`, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("groupNameBox").value })})
      fetch(`/api?classname=lead&param=anatomy&id=${groupData.leadInfo.id}`, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("anatomyBox").value })})
      fetch(`/api?classname=lead&param=strength&id=${groupData.leadInfo.id}`, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setType: 'absolute', setValue: document.getElementById("strengthBox").value })})

      fetch("/api?classname=pprog&param=groupData").then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {return {...prev, groupIDs: data.curValue.groupIDs, groupNames: data.curValue.groups, leadNames: data.curValue.targets}})});
      fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()}).then((data)=>{if(data && data.curValue != undefined) {setGroupData(prev => {return {...prev, leadInfo: data.curValue};});  }}); 
      document.getElementById("leadNameBox").value = "";
      document.getElementById("groupNameBox").value = "";
      document.getElementById("anatomyBox").value = "";
      document.getElementById("strengthBox").value = "";
    }
    setCurPage("home");
    setRefresh(!refresh);
  }
  function handleExit() {setCurPage2("home");}
  function matchPage()  {
    let word = curPage2.toLowerCase().replace(/\s+/g,"").replace("-","");
    return  word === "settings" || word === "settingspage" || word === "all";
  }

  return (matchPage()) 
  ? (<>
    <fieldset>
    <legend>
      <div id="groups-pane-cprog" class="groups-tab-cprog tab"> 
        <button id="profile-button-cprog" class={`group-pane-button cprog-btn ${(curSubpage === "profile") ? "active" : ""}`} onClick={(e)=>{setCurSubPage("profile"); setCurPage2("settings"); setActive(e);}}> Profile  </button>
        <button id="group-cprog" class={`group-pane-button cprog-btn ${(curSubpage === "pain-control") ? "active" : ""}`} onClick={(e)=>{setCurSubPage("pain-control"); setCurPage2("settings"); setActive(e);}}>      Stim       </button>
      </div>
    </legend>
    {getProfile()}
    {getPainControl()}
    </fieldset>
    <BottomButtons handleExit={handleExit} handleSave={handleSubmit} />
  </>) : (<></>)
}

// Encapsulates "Exit" and "Save Settings" buttons.
export function BottomButtons(params) {
  return <>
    <div id="bottom-btns">
      {(params.handleExit) ? <button class="submit-buttons half-btn" type="button" onClick={params.handleExit}>Exit</button> : <></>}
      {(params.handleSave) ? <button class="submit-buttons half-btn" type="button" onClick={params.handleSave}>Save Settings</button> : <></>}
    </div>
  </>
}










