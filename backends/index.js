require("dotenv/config")

const express = require("express")
const mongoose = require("mongoose")
const route = require("./Router/userRoute")
var cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello")

})

app.use("/user",route)

const PORT = process.env.PORT || 8000

app.listen(PORT,async()=>{
    await mongoose.connect(process.env.DBURL)
    console.log("listen")
})