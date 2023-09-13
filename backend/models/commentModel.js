const mongoose=require("mongoose");

const commentSchema= new mongoose.Schema({
     comment:{
        type:String,
        required:true,
        max:150,
     },
     project_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
     },
     student_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
     },
     student_img:{
        type:String,
     }
      
});
module.exports= mongoose.model("Comments",commentSchema);