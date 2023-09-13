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
      type:{
        type:String,
        // required:true,
      },
      contributors:{
        type:Array,
      },
      usedTechnology:{
        type:String,
        
      },
      rating:{
        type:Number,
      },
      link:{
        type:String,
      },
      filePath:{
        type:String,
      },
      folderStructure: mongoose.Schema.Types.Mixed,
      
});
module.exports= mongoose.model("Projects",projectSchema);