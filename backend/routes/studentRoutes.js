const express=require("express");
const { getStudentInfo, upDateStudentInfo, signUpStudent, logInStudent, upDateStudentImg } = require("../controllers/studentControllers");

const router=express.Router();

router.post("/signup",signUpStudent);
router.post("/login",logInStudent);
router.get("/student/:id",getStudentInfo);
router.post("/updateinfo/:id",upDateStudentInfo);//update all info eccepted img
router.post("/updateimg/:id",upDateStudentImg);

module.exports=router;