const mongoose=require("mongoose");

const notificationSchema=new mongoose.Schema({
     
    type:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    notificationFor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    senderStudent:Object
})

module.exports=mongoose.model("Notifications",notificationSchema);