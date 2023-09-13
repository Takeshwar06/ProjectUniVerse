const mongoose=require("mongoose");

const connectionShema=new mongoose.Schema({
      request:{
        type:Boolean,
        default:false,
      },
      accepted:{
        type:Boolean,
        default:false,
      },
      sender_name:{
        type:String,
        required:true
      },
      sender_img:{
        type:String,
        required:true
      },
      sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
      },
      receiver_name:{
        type:String
      },
      receiver_img:{
        type:String
      },
      receiver_id:{
        type:mongoose.Schema.Types.ObjectId
      },
})

module.exports=mongoose.model("Connections",connectionShema);