import React, {useState, useEffect, createContext, useContext, useRef, useReducer} from 'react';
import ReactDOM from 'react-dom';
//import {connect} from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; 

const context = createContext();
 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//My code starts
//incr = () => {count++;};
function incr(amt=1, ev) {count += amt; alert(ev.type)}
function Test(params) {
  const [count, setCount] = useState(0);
  return (
  <>
  <h2>Hi, I am a function component! My params are {params.msg}</h2>
  <button onClick={(event)=>incr(2, event)}>Press</button> <br></br>
  <button onClick={()=>{count=0}}>Reset</button>
  </>
  );
}
function Test2(params) {
  const inputElement = useRef();
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  useEffect(()=>{
    let timer = setTimeout(()=>{
      setTime(time => (time+1)%60);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count]);
  return (
  <>
  <p>Count is {count}</p>
  <button onClick={()=>setCount(count+1)} ref={inputElement}>Add</button> 
  <button onClick={()=>setCount(0)}>Reset</button>
  <p>Timer: {time}</p>
  </>
  );
}
