import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"
const Home = () => {
  const [Timer, setTimer] = useState(JSON.parse(localStorage.getItem("time")) || 300)
  const [userdata, setdata] = useState()
  const [message, setmessage] = useState()
  const [Allmessage, setAllmessages] = useState()
  const [adminarray, setAdminarray] = useState()
  const [adminbool, setadmin] = useState(() => {
    return JSON.parse(localStorage.getItem("loggedInId")) === "6314caf1ee0c37cf4553386b" ? true : false

  })

  const navigates = useNavigate()
  const ref = useRef()
  const timer = () => {
    ref.current = setInterval(() => {

      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(ref.current)
          //  handleLogOut()
          return 300
        } else {
          localStorage.setItem("time", JSON.stringify(prev - 1))
          return prev - 1
        }

      })
    }, 1000);
  }

  const getbyId = async () => {
    const id = JSON.parse(localStorage.getItem("loggedInId"))
    try {
      const datas = await axios.get(`https://vaishali-backend.herokuapp.com/user/${id}`)
      setdata(datas.data)
    } catch (e) {
      console.log(e)
    }

  }

  const handlemessages = async () => {
    const id = JSON.parse(localStorage.getItem("loggedInId"))
    const mes = {
      messageText: message,
      owner: id
    }
    try {
      await axios.post("https://vaishali-backend.herokuapp.com/user/message", mes)
      messagedisplay()
    } catch (e) {
      console.log(e)
    }

  }

  const messagedisplay = async () => {
    const id = JSON.parse(localStorage.getItem("loggedInId"))
    try {
      const mesdata = await axios.get(`https://vaishali-backend.herokuapp.com/user/${id}`)
      setAllmessages(mesdata.data)
    } catch (e) {
      console.log(e)
    }

  }

  const handleLogOut = async () => {
    const t = JSON.parse(localStorage.getItem("time"))
    const id = JSON.parse(localStorage.getItem("loggedInId"))
    let x = 300 - Number(t)
    let y = Math.floor(x / 60)
    let r = x % 60
    const time = y + ":" + r
    try {
      await axios.patch(`https://vaishali-backend.herokuapp.com/user/${id}`, { time: time })
      localStorage.clear()
      navigates("/login")
    } catch (e) {
      console.log(e)
    }

  }

  const handleLogOutt = () => {
    localStorage.clear()
    navigates("/login")
  }


  const adminshow = async () => {
    try {
      const allusers = await axios.get(`https://vaishali-backend.herokuapp.com/user`)
      setAdminarray(allusers.data)

    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (adminbool) {
      adminshow()
      console.log("epkfpefk")
    } else {
      timer()
      getbyId()
      messagedisplay()
    }

  }, [])


  return (
    <>
      {adminbool ? <>
        <div>
        <NavLink to="/login" >Login</NavLink >
          <button onClick={handleLogOutt}>Logout</button>
          
        </div>
        <div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Messages</th>
              </tr>
              <tbody>
                {adminarray?.map((user) => (
                  <tr>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>
                      {
                        user.messages.map((msg) => (
                          <div key={msg.id}>{msg.messageText}</div>
                        ))
                      }

                    </td>
                  </tr>
                ))}


              </tbody>
            </thead>



          </table>

        </div>
      </> : <>

        <NavLink to="/login" >Login</NavLink >
        <button onClick={handleLogOut}>Logout</button>
        {/* <NavLink to="/login" >Logout</NavLink > */}
        <div>Session Expires in {Timer} Seconds</div>
        <div>WelCome:{userdata && userdata.Name}</div>
        <input type="text" name="messageText" onChange={(e) => setmessage(e.target.value)} />
        <button onClick={handlemessages}>Submit</button>
        <div>

          <table >

            <tr>
              <th>Logged In At</th>
              <th>Messages</th>
              <th>Session (minute:second)</th>
            </tr>

            <td>
              {Allmessage && Allmessage.Time?.map((e, i) => (
                <tr key={i}>{e}</tr>
              ))}
            </td>
            <td>
              {Allmessage && Allmessage.messages?.map((e, i) => (
                <tr key={i}>{e.messageText}</tr>
              ))}
            </td>
            <td>
              {Allmessage && Allmessage.sessionDuration?.map((e, i) => (
                <tr key={i}>{e}</tr>
              ))}
            </td>
          </table>
        </div>


      </>}

    </>

  )
}

export default Home