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
        default:""
      },
      bio:{
        type:String,
        default:"",
      },
      college:{
        type:String,
        default:"",
      },
      course:{
        type:String,
        default:"",
      },
      passYear:{
        type:String,
        default:"",
      },
      sem_year:{
        type:String,
        default:"",
      },
      location:{
        type:String,
        default:"",
      },
      connection:{
        type:Number,
        default:0,
      },
      ratting:{
        type:Number,
        default:0,
      },
      link:{
        website:{
          type:String,
          default:"",
        },
        linkdin:{
          type:String,
          default:"",
        },
        instagram:{
          type:String,
          default:"",
        },
        github:{
          type:String,
          default:"",
        },
      },
      technology:{
        type:[String],
      },
      programming:{
        type:[String],
      },

});
module.exports= mongoose.model("Students",studentSchema);