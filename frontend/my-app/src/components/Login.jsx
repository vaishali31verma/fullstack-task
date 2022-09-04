import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useEffect } from 'react'

const Login = () => {
  const [form,setform] = useState(()=>{
    var currentdate = new Date();
var datetime =  currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds()
return {Time:datetime}
  })
   const navigates = useNavigate()

  const handleSubmit =async(e)=>{
    e.preventDefault()
   
    try{
     let data= await  axios.patch("https://vaishali-backend.herokuapp.com/user/login",form)
     localStorage.setItem("loggedInId",JSON.stringify(data.data._id))
      navigates("/Home")
    }catch(e){
      console.log(e)
    }
    

  }
 

  const handleChange=(e)=>{
    const {name,value} = e.target
    
   setform({...form,[name]:value})
    
  }

  console.log(form)
 


  return (
    <form onSubmit={handleSubmit}>
        <input type="text"   name="Name" onChange={handleChange} placeholder="Enter name"/>
        <input type="email"  name="Email" onChange={handleChange}  placeholder="Enter email" />
        <input type="number"  name="MobileNumber" onChange={handleChange} placeholder="Enter mobileno"  /> 
        <input type="submit"/>
    </form>
  )
}

export default Login