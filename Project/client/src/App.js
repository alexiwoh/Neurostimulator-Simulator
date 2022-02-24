
import React from "react";
import logo from "./logo.svg";
import "./App.css"; 

function App() {
 
  const [data, setData] = React.useState(null);
  const [jsx, setJSX] = React.useState((<p></p>));

  /*React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);*/

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        let j = [(<h1>Project</h1>)];
        j = j.concat(data.message.split("\n").map(s => <p>{s}</p>));
        setJSX(j);
      });
  }, []);

  return (
    <>
      <div className="App">
        <p>{!data ? "Loading!..." : ""}</p>
      </div>  
      {jsx}
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
