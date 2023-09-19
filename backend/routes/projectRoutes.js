const express=require("express");
const multer=require("multer");
const { upLoadProject,getCode,upDateProjectFile, getProjects, getProject } = require("../controllers/projectControllers");

const router=express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage:storage})

router.post("/projectupload",upload.single("projectFile"),upLoadProject);
router.post("/updateprojectfile/:id",upload.single("projectFile"),upDateProjectFile);
router.post("/getprojects",getProjects);
router.get("/getproject/:id",getProject);
router.post("/getcode",getCode);

module.exports=router;