const express=require("express");
const multer=require("multer");
const { addDocumentation, upDateDocumentationText, upDateDocumentationImage, deleteDocumentation } = require("../controllers/documentationControllers");
const router=express.Router();

const storage=multer.memoryStorage();
const upload=multer({storage:storage});

router.post("/adddocumentation",upload.single("documentationImage"),addDocumentation);
router.post("/updatedocumentaionimg/:id",upload.single("documentaionImage"),upDateDocumentationImage);
router.post("/updatedocumentation/:id",upDateDocumentationText);
router.delete("/deletedocumentaion/:id",deleteDocumentation);


module.exports=router;