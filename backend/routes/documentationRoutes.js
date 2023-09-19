const express=require("express");
const { addDocumentation, upDateDocumentationText, upDateDocumentationImage, deleteDocumentation } = require("../controllers/documentationControllers");
const router=express.Router();



router.post("/adddocumentation",addDocumentation);
router.post("/updatedocumentaionimg/:id",upDateDocumentationImage);
router.post("/updatedocumentation/:id",upDateDocumentationText);
router.delete("/deletedocumentaion/:id",deleteDocumentation);


module.exports=router;