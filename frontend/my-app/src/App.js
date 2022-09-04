import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { useEffect, useRef, useState } from 'react';
import { Router } from 'react-router-dom';
import Routerss from './Router/Router';

function App() {

  // console.log(Timer)
  // useEffect(()=>{
  //      timer()
  // },[])
  
  return (
    <div className="App">
      {/* <Home Timer={Timer}  timer={timer} /> */}
       <Routerss />
    </div>
  );
}

export default App;
