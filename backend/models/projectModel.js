const mongoose=require("mongoose");

const projectSchema= new mongoose.Schema({
      titel:{
       type:String,
       required:true,
      },
      discription:{
        type:String,
        required:true,
        max:250
      },
      student_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
      },
      onGoing:{
        type:Boolean,
        // required:true,
      },
      contributors:{
        type:[String],
      },
      usedTechnology:{
        type:String,
        default:""
      },
      rating:{
        type:Number,
        default:0
      },
      link:{
        type:String,
        default:""
      },
      filePath:{
        type:String,
        default:""
      },
      folderStructure: mongoose.Schema.Types.Mixed,
      zipBuffer:Buffer,
      
});
module.exports= mongoose.model("Projects",projectSchema);