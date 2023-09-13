const mongoose=require("mongoose");

const studentSchema= new mongoose.Schema({
    // foodname:{
    //     type:String,
    //     required:true,
    //     min:2,
    //     max:20,
    // }
      name:{
       type:String,
       required:true,
      },
      email:{
        type:String,
        required:true,
      },
      password:{
        type:String,
        required:true,
        max:10,
      },
      image:{
        type:String,
        default:null
      },
      college:{
        type:String,
        default:null,
      },
      course:{
        type:String,
        default:null,
      },
      passYear:{
        type:Number,
        default:null,
      },
      sem_year:{
        type:String,
        default:null,
      },
      location:{
        type:String,
        default:null,
      },
      connection:{
        type:Number,
        default:null,
      },
      ratting:{
        type:Number,
        default:null,
      },
      link:{
        type:Object,
        default:{}
      },
      technology:{
        type:Array,
      },
      programming:{
        type:Array,
      },

});
module.exports= mongoose.model("Students",studentSchema);