import { useState, createContext, useContext, useEffect } from "react";
//import React from "react"
import "./Componenets.css";
import HumanBody from "./images/HumanBody.png";

const DEBUG = true;
const border = {border:"3px solid rgba(0, 0, 0, 0.0)"};
const curPageContext = createContext(); // Context for the 1st column/screen.
const curPageContext2 = createContext(); // Context for the 2nd column/screen.

export default function TestPage(params)  {
  return (<></>)

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
}// onChange={(e)=>setCurPage(e.target.value)}

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
  
  const [curPage, setCurPage] = useState("all");
  const [curPage2, setCurPage2] = useState("all");
  
  return (
    <>
      <curPageContext.Provider value={{curPage, setCurPage, curPage2, setCurPage2}}>
        <div id="testDeviceBox" class="testDeviceBox">
          <EnterPage />
        </div>
        <div id="testDeviceBox2" class="testDeviceBox">
          <EnterPage2 />
        </div>
        <div>
          <div id="deviceBox1" class="deviceBox">
            <Clock />
            <HomePage />
            <ProgrammerInfoPage />
            <GroupsPage />
            <Page1  />
            <Page2  />
          </div>
          <div id="deviceBox2" class="deviceBox">
            <PageA  />
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
          
          <br></br>
          </fieldset>
          </div>
          <BottomButtons handleExit={handleExit} />
          </div>
      </>)
    : (<><div style={border}></div></>) 
}

// Programmer Info and settings page
export function ProgrammerInfoPage(params)  {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  const [sNo, setSNo] = useState(""); const [vNo, setVNo] = useState("");
  const [mDate, setMDate] = useState("");
  const [on, setOn] = useState(true);
  const [curDate, setCurDate] = useState(new Date());
  const [test, setTest] = useState(new Date());

  useEffect(()=>{
    if(!matchPage) return;
    fetch("/api?classname=pprog&param=serialNo").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setSNo(data.curValue)})
    fetch("/api?classname=pprog&param=versionNo").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setVNo(data.curValue)})
    fetch("/api?classname=pprog&param=manufacturerDate").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setMDate(data.curValue)})
    fetch("/api?classname=pprog&param=date").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setCurDate(new Date(data.curValue))})
  }, [curPage]);

  function handleExit() {setCurPage("all");}
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
  function matchPage()  {
    let word = curPage.toLowerCase().replace(/\s+/g,"").replace("-","");
    return  word === "pinfo" || word === "programmerinfo" || word === "all"
  }
//value={curDate.toLocaleTimeString()}
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
          </fieldset>
          </div>
          <BottomButtons handleExit={handleExit} handleSave={handleSave} />
          </div>
      </>)
      : (<><div style={border}></div></>) 
}

// Ticking Clock component
export function Clock(params)  {
  const [date, setDate] = useState(new Date());
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  useEffect(()=>{
    const tid = setInterval(() => {
    fetch("/api?classname=pprog&param=date").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setDate(new Date(data.curValue))})
    }, 15000) 
    return () => {clearInterval(tid)};
  },[])
  useEffect(()=>{
    fetch("/api?classname=pprog&param=date").then((res) => {return res.json()})
    .then((data)=>{if(data && data.curValue != undefined) setDate(new Date(data.curValue))})
  },[curPage])
  
  return (<>
    <div id="clock-1" class="header" ><p style={{"margin-left":"3%"}}>Current Date: {date.toDateString()}, {date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</p></div>
    {/*<div class="footer" ><p>Current Date: {date.toDateString()}, {date.toLocaleTimeString()}</p></div>*/}
  </>)
}  

export function BottomButtons(params) {
  return <>
    {(params.handleSave) ? <button class="submit-buttons" type="button" onClick={params.handleSave}>Save Settings</button> : <></>}
    {(params.handleExit) ? <button class="submit-buttons" type="button" onClick={params.handleExit}>Exit</button> : <></>}
  </>
}

export function HomePage() {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  const [id, setID] = useState(""); const [phone, setPhone] = useState(""); 
  const [physicanName, setPhysicianName] = useState("");

  function matchPage()  {
    let word = curPage.toLowerCase().replace(/\s+/g,"").replace("-","");
    return  word === "home" || word === "homepage" || word === "all";
  }
  return (matchPage()) ? (<>
    <div id="back" class="back"> {/*style={{backgroundImage: `url(${HumanBody})`}}>*/}
      {/*<img src={HumanBody} alt="Logos" width="35%" height="400"></img>*/}
      <p>Hello</p>
    </div>
  </>) : (<></>)
}

// Pages for Group and lead settings and device information.
export function GroupsPage(params) {
  const {curPage, setCurPage, curPage2, setCurPage2} = useContext(curPageContext);
  const [curSubpage, setCurSubPage] = useState("pain-control");
  const [curSubpage2, setCurSubPage2] = useState("device");
  const [curGroupID, setCurGroupID] = useState(0);
  const [curLeadID, setCurLeadID] = useState(0);
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

  useEffect(()=>{
    if (!matchPage) return;
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

    }
  },[curPage,curSubpage,curSubpage2])

  function setActive(event)  {
    // Get the buttons.
    let buttons = document.getElementById(event.target.parentElement.id).getElementsByClassName(event.target.className);
    // Loop through buttons and remove 'active' designation.
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" active", "");
    }
    // Make this button 'active'.
    document.getElementById(event.target.id).className +=  " active";
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
          <button class="group-select-button">{curGroupID}</button>
          <div class="group-select-content">
            <p>Link 1</p>
            <p>Link 2</p>
            <p>Link 3</p>
          </div>
        </div>
        <fieldset>
          <legend>
            <div id="paincontrol-pane" class="groups-tab tab"> 

            </div>
          </legend>
        </fieldset>
      </div>
    </>) : (<></>)
  }

  function handleExit() {setCurPage("all");}
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
    <br></br><br></br><br></br><br></br><br></br>
    
    
    {(<></>)}
    <BottomButtons handleExit={handleExit} />
  </>) : (<></>)
}