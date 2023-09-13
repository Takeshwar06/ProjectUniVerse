const express=require("express");
const multer=require("multer");
const { getStudentInfo, upDateStudentInfo, signUpStudent, logInStudent, upDateStudentImg } = require("../controllers/studentControllers");

const router=express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage:storage});

router.post("/signup",signUpStudent);
router.post("/login",logInStudent);
router.get("/student/:id",getStudentInfo);
router.post("/updateinfo/:id",upDateStudentInfo);//update all info eccepted img
router.post("/updateimg/:id",upload.single("profileImg"),upDateStudentImg);

module.exports=router;