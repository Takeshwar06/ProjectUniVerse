const Students = require("../models/studentModel");
const fs = require('fs');

module.exports.signUpStudent = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        const allReadyExist = await Students.findOne({ name, email });
        if (allReadyExist) {
            return res.json({ success: false, msg: "Student Profile Allready Exist,Use Different Email" })
        }

        const studentData = await Students.create({
            name, email, password
        })
        // res.status(200).json({msg:"Profile Created SuccessFully"});
        return res.json({ success: true, student_id: studentData._id })
    } catch (error) {
        next(error)
    }

}

module.exports.logInStudent = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const allReadyExist = await Students.findOne({ password, email });
        if (allReadyExist) { // success
            return res.json({ success: true, msg: "WelCome to your account",student_id:allReadyExist._id })
        }
        return res.json({ success: false, msg: "Authentication failed" });
    } catch (error) {
        next(error)
    }

}
module.exports.getStudentInfo = async (req, res, next) => {
    // return res.json({success:false,msg:"document not found"})

    try {
        const student_id = req.params.id;
        const studentData = await Students.findOne({ _id: student_id },{password:0})
        if (!studentData) {
            return res.json({ success: false, msg: "document not found" })
        }
        return res.json(studentData)
    } catch (error) {
        next(error)
    }

}

module.exports.upDateStudentInfo = async (req, res, next) => {

    try {
        const {
            name, email, password,
            college, course, passYear,
            sem_year, location, instagram,linkdin,website,github,
            technology, programming,image,bio
        } = req.body;

        let response = await Students.updateOne({ _id: req.params.id },
            {
                $set: {
                    name, email, password,
                    college, course, passYear,
                    sem_year, location, link:{instagram,linkdin,website,github},
                    technology, programming,image,bio
                }
            })
        return res.json(response);

    } catch (error) {
        next(error)
    }

}

module.exports.upDateStudentImg = async (req, res, next) => {

    try {
        const file=req.files.profileImg;
        // console.log(file);
        cloudinary.uploader.upload(file.tempFilePath,async(err,result)=>{
            if(err)return res.json({success:false,msg:"image not upload"})
            // let response = await Students.updateOne({ _id: req.params.id },
        //     { $set: { image: fileUrl } });
          const fileUrl=result.url;
          return res.status(200).json({ success: true, msg: "profile image change successfully", img_url: fileUrl })
           
        })
        
    } catch (error) {
        next(error)
    }

}