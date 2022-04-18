
import React from "react";
import logo from "./logo.svg";
import "./App.css"; 
import "./Componenets.css";
import {AppComponents, Page1, Page2 } from "./Componenets"

function App() {
 
  const [data, setData] = React.useState(null);
  const [jsx, setJSX] = React.useState((<p></p>));
  const [refresh, setRefresh] = React.useState(false);
  //setInterval(()=>{setRefresh(!refresh)}, 60000);

  /*React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);*/

  React.useEffect(() => {
    fetch("/api")
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((data) => {
        setData(data.message);
        let j = [(<h1>All device data (for testing purposes...)</h1>)];
        j = j.concat(data.message.split("\n").map(s => <p>{s}</p>));
        setJSX(j);
      });   
  }, []);

  return (
    <>
      <div className="App">
        <p>{!data ? "Loading!..." : ""}</p>
      </div>
      <div>
        <AppComponents />
      </div>  
      <div id="dataAsText">  
        {jsx}
      </div>  
    </>
  );

  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
  *

  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}

export default App;
