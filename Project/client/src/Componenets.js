import { useState, createContext, useContext, useEffect } from "react";
//import React from "react"
import "./Componenets.css";
import HumanBody from "./images/HumanBody.png";

const DEBUG = false;
const border = {border:"3px solid rgba(0, 0, 0, 0.0)"};
const curPageContext = createContext(); // Context for the 1st column/screen.
const curPageContext2 = createContext(); // Context for the 2nd column/screen.
function pagename(s) {return s.toLowerCase().replace(/\s+/g,"").replace("-","");}; // Convert page name for parsing.

export default function TestPage(params)  {
  return (<></>);
}

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

export function AppComponents(params) {
  
  const [curPage, setCurPage] = useState("home");
  const [curPage2, setCurPage2] = useState("all");
  
  return (
    <>
      <curPageContext.Provider value={{curPage, setCurPage, curPage2, setCurPage2}}>
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
              <Page1  />
              <Page2  />
              <Footer />
            </div>
          </div>
          <div id="deviceBox2" class="deviceBox">
            <Clock type="cprog" />
            {<PageA  />}
          </div>
        </div>
      </curPageContext.Provider>
      
    </>
  );
}

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

/***                                ***/
/*** PATIENT PROGRAMMER COMPONENETS ***/
/***                                ***/

// Programmer Info and settings page
export function ProgrammerInfoPage(params)  {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  const [sNo, setSNo] = useState(""); const [vNo, setVNo] = useState("");
  const [mDate, setMDate] = useState("");
  const [on, setOn] = useState(true);
  const [curDate, setCurDate] = useState(new Date());
  const [stim, setStim] = useState("");

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

  function handleExit() {setCurPage("home");}
  function handleSave() {
    let d = new Date(document.getElementById("current-time-select").value);
    //alert(` date:${d}\n year: ${d.getFullYear()}\n month: ${d.getMonth()}\n day: ${d.getDay()}\n hours: ${d.getHours()}`)
    fetch("/api?classname=pprog&param=date", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'absolute', setValue: new Date(''+d.getFullYear(), ''+d.getMonth()-0, ''+d.getDay(), ''+d.getHours(), ''+d.getMinutes()).getTime() })
    })
    .then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setCurDate(new Date(data.curValue))})
    setCurPage("all"); setCurPage("pinfo");
  }  
  function handleStim() {
    let old = stim;
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

// Ticking Clock component. Also, handles some timed events.
export function Clock()  {
  const [date, setDate] = useState(new Date());
  const [battery, setBattery] = useState(0.5); // Battery level.
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  //const [type, setType] = useState((params.type === undefined) ? "pprog" : params.type);

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
    {/*<div class="footer" ><p>Current Date: {date.toDateString()}, {date.toLocaleTimeString()}</p></div>*/}
  </div>
  </>)
}  

export function Footer()  {
  const [id, setID] = useState("");
  const [SN, setSN] = useState("");
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
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

export function BottomButtons(params) {
  return <>
    {(params.handleExit) ? <button class="submit-buttons half-btn" type="button" onClick={params.handleExit}>Exit</button> : <></>}
    {(params.handleSave) ? <button class="submit-buttons half-btn" type="button" onClick={params.handleSave}>Save Settings</button> : <></>}
  </>
}

export function HomePage() {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  const [id, setID] = useState(""); const [phone, setPhone] = useState(""); 
  const [physicanName, setPhysicianName] = useState("");

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
    <div id="home-pane" class="home-pane"> {/*style={{backgroundImage: `url(${HumanBody})`}}>*/}
      {/*<img src={HumanBody} alt="Logos" width="35%" height="400"></img>*/}
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

export function Macro() {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  useEffect(()=>{
    return;
  }, [curPage])
  return (<></>)
}

// Pages for Group and lead settings and device information.
export function GroupsPage() {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  const [curSubpage, setCurSubPage] = useState("pain-control");
  const [curSubpage2, setCurSubPage2] = useState("device");
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
      "level": "",
      "target": "",
      "sendable": true,
      "id": 0,
      "index": 0
    }
  }); 
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
  });

  useEffect(()=>{setCurSubPage("pain-control")},[curPage])

  useEffect(()=>{
    if (!matchPage()) return;
    if (curSubpage === "my-info")  {
      if(curSubpage2 === "device")  {
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
      } else if (curSubpage2 === "physician") {
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
      } else if (curSubpage2 === "clinic") {
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
    } else if (curSubpage === "pain-control")  {
        fetch("/api?classname=pprog&param=groupData").then((res) => {return res.json()})
        .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
          return {...prev, groupIDs: data.curValue.groupIDs, groupNames: data.curValue.groups, curGroup: data.curValue.currentGroup, leadNames: data.curValue.targets}
        })}); 
    }
  },[curPage, curSubpage, curSubpage2, curGroupID])

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
  },[curLeadID])

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
  },[curGroupID])

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
  }

  function changeLevel(amount)  {
    
    if (!matchPage() || curSubpage !== "pain-control") return;
    fetch(`/api?classname=lead&param=level&id=${groupData.leadInfo.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setType: 'relative', setValue: amount })
    })

    fetch(`/api?classname=group&param=leadInfo&id=${curGroupID}`).then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setGroupData(prev => {
      return {...prev, leadInfo: data.curValue};
    })}); 
  }  

  function setActive(event)  {
    // Get the buttons.
    let buttons = document.getElementById(event.target.parentElement.id).getElementsByClassName(event.target.className);
    // Loop through buttons and remove 'active' class name.
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" active", "");
    }
    // Make this button 'active'.
    document.getElementById(event.target.id).className +=  " active";
  }

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
  }

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
            <button id="device-info-button" class="info-pane-button active" onClick={(e)=>{setCurSubPage2("device"); setCurPage("groups"); setActive(e);}}>     Device        </button>
            <button id="physician-info-button" class="info-pane-button" onClick={(e)=>{setCurSubPage2("physician"); setCurPage("groups"); setActive(e);}}>  Physician     </button>
            <button id="clinic-info-button" class="info-pane-button" onClick={(e)=>{setCurSubPage2("clinic"); setCurPage("groups"); setActive(e);}}>     Clinic        </button>
          </div>
        </legend>
        {innerJSX}
      </fieldset>
      </div>
    </>) : (<></>)
  } 

  function getPainControl()  {
    return (curSubpage === "pain-control") ? (<>
      <div>
        <div class="group-select">
          <select name="group-selector" id="group-selector" onChange={(e)=>{setCurGroupID(Number(e.target.value));}}>
            {(()=>{
                let gr = [];
                let gi = groupData.groupIDs;
                let gn = groupData.groupNames;
                for(let i=0; i< gi.length; i++) gr.push((<option value={gi[i]}> {gn[i]} </option>));
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
                  <button id="lead-button-0" class="info-pane-button active" onClick={(e)=>{setCurLeadID(0); setCurSubPage2("lead-0"); setCurPage("groups"); setActive(e);}}>{groupData.leadNames[0]} </button>
                  <button id="lead-button-1" class="info-pane-button" onClick={(e)=>{setCurLeadID(1); setCurSubPage2("lead-1"); setCurPage("groups"); setActive(e);}}>{groupData.leadNames[1]} </button>
                  <button id="lead-button-2" class="info-pane-button" onClick={(e)=>{setCurLeadID(2); setCurSubPage2("lead-2"); setCurPage("groups"); setActive(e);}}>{groupData.leadNames[2]} </button>
                  <button id="lead-button-3" class="info-pane-button" onClick={(e)=>{setCurLeadID(3); setCurSubPage2("lead-3"); setCurPage("groups"); setActive(e);}}>{groupData.leadNames[3]} </button>
                </>)
                : (<></>)
              }
            </div>
          </legend>
          <div>
            <div class="up-dn-pane">
              <button class="on-btn" onClick={toggleOn} style={{"animation":(groupData.leadInfo.on) ? "on-blink 1.0s infinite" : "none"}}>{(groupData.leadInfo.on) ? "ON" : "OFF"}</button>
              <button class="up-dn-btn" onClick={()=>{changeLevel(-0.05)}}  style={{"animation":(groupData.leadInfo.on) ? "on-blink 1.0s infinite" : "none"}}> - </button>
              <button class="up-dn-btn" onClick={()=>{changeLevel(0.05)}}   style={{"animation":(groupData.leadInfo.on) ? "on-blink 1.0s infinite" : "none"}}> + </button>
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
        <button id="pain-control-button" class="group-pane-button active" onClick={(e)=>{setCurSubPage("pain-control"); setCurPage("groups"); setActive(e);}}> Pain Control  </button>
        <button id="my-info-button" class="group-pane-button" onClick={(e)=>{setCurSubPage("my-info"); setCurPage("groups"); setActive(e);}}>      My Info       </button>
      </div>
    </legend>
    {getMyInfo()}
    {getPainControl()}
    </fieldset>
    <BottomButtons handleExit={handleExit} />
  </>) : (<></>)
}











/***                                  ***/
/*** CLINICIAN PROGRAMMER COMPONENETS ***/
/***                                  ***/