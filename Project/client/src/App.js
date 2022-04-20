
import React from "react";
import logo from "./logo.svg";
import "./App.css"; 
import "./Componenets.css";
import {AppComponents, Page1, Page2 } from "./Componenets"
const DEBUG = false;

function App() {
 
  const [data, setData] = React.useState(null);
  const [jsx, setJSX] = React.useState((<p></p>));

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
        {(DEBUG) ? jsx : <></>}
      </div>  
    </>
  );
}

export default App;
