const mongoose=require("mongoose");

const documentationSchema= new mongoose.Schema({
   image:String,
   heading:String,
   discription:String,
   project_id:mongoose.Schema.Types.ObjectId
});
module.exports= mongoose.model("Documentations",documentationSchema);