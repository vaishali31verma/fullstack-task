const express = require("express")
const Message = require("../Schema/messageSchema")
const route = express.Router()
const User = require("../Schema/userSchema")


route.get("/",async(req,res)=>{

    try{
        const x = await User.find().populate("messages")
        res.send(x)
    }catch(e){
        res.status(500).send(e.message)
    }
   
})
route.patch("/login",async(req,res)=>{
    try{
            
     let data= await User.updateOne({Name : req.body.Name},{Name:req.body.Name,Email:req.body.Email,MobileNumber:req.body.MobileNumber,$push:{Time:req.body.Time}},{upsert:true})
     let userdata = await User.findOne({Name:req.body.Name,Email:req.body.Email})
      res.send(userdata)
      
    }catch(e){
        res.status(500).send(e.message)
    }
})

route.get("/:id",async(req,res)=>{
    try{
         const user = await User.findById(req.params.id).populate("messages")
        res.send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
})
route.post("/message",async(req,res)=>{
        try{
            let data = await  Message.create(req.body)
            let usermessage = await User.findByIdAndUpdate(req.body.owner,{$push:{messages:data._id}})
            res.send(usermessage)
        }catch(e){
            res.status(500).send(e.message)
        }
})
 route.patch("/:id",async(req,res)=>{
    try{
        let user = await User.findByIdAndUpdate(req.params.id,{$push:{sessionDuration:req.body.time}})
        res.send(user)
    }catch(w){
        console.log(w)
    }
 })


module.exports = route