const mongoose = require("mongoose")
const User = require("./userSchema")


const messageSchema = new mongoose.Schema({
    messageText:{type:String,required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{
    versionKey:false,
   
})
const Message = mongoose.model("Message",messageSchema)

module.exports = Message