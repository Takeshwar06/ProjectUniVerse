const express=require("express");
const multer=require("multer");
const { upLoadProject, upDateProjectFile } = require("../controllers/projectControllers");

const router=express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage:storage})

router.post("/projectupload",upload.single("projectFile"),upLoadProject);
router.post("/updateprojectfile/:id",upload.single("projectFile"),upDateProjectFile);

module.exports=router;