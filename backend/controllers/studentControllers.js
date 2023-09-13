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
            return res.json({ success: true, msg: "WelCome to your account" })
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
        const studentData = await Students.findOne({ _id: student_id })
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
            sem_year, location, link,
            technology, programming
        } = req.body;
        link = JSON.parse(link);
        technology = JSON.parse(technology);
        programming = JSON.parse(programming);

        let response = await Students.updateOne({ _id: req.params.id },
            {
                $set: {
                    name, email, password,
                    college, course, passYear,  
                    sem_year, location, link,
                    technology, programming
                }
            })
        return res.json(response);

    } catch (error) {
        next(error)
    }

}

module.exports.upDateStudentImg = async (req, res, next) => {

    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        let { originalname } = req.file;
        originalname = originalname.split(" ").join("");
        const { student_id } = req.body;
        const zipBuffer = req.file.buffer;
        const myPath = `uploads/${student_id}`
        const newName=`${Date.now()}_${originalname}`

        if (!fs.existsSync(myPath)) {
            fs.mkdirSync(myPath, { recursive: true });
        }  

        fs.writeFileSync(`${myPath}/${newName}`, zipBuffer);
        const fileUrl = `${req.protocol}://${req.get('host')}/${myPath}/${newName}`;
        let response = await Students.updateOne({_id: req.params.id },
            { $set: { image: fileUrl } });

        if (response.acknowledged === true) {
            return res.status(200).json({ success: true, msg: "profile image change successfully", img_url: fileUrl })
        }
        return res.json({ success: false, msg: "profile image not change" });
    } catch (error) {
        next(error)
    }

}