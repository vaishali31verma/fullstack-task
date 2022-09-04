const mongoose = require("mongoose")

const schemauser = new mongoose.Schema({
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    MobileNumber:{type:String,required:true},
    Time:[{type:String}],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,ref:"Message"
    }],
    sessionDuration:[{type:String}]
   
},{
    versionKey:false,
    
   
})

const User = mongoose.model("User",schemauser)

module.exports = User