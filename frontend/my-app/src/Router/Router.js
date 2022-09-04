import React from 'react'
import Login from '../components/Login'
import {  Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import PrivateRoute from './PrivateRoute';
const Routerss = () => {
  return (
    <>
    <Routes>

     <Route path="/login" element={<PrivateRoute><Login/></PrivateRoute>}/>
       <Route path="/Home" element={<Home/>}/>
   
    </Routes>
    </>


  )
}

export default Routerss