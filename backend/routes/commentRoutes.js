const express=require("express");
const { getComments, sendComment, deleteComment, deleteAllComment } = require("../controllers/commentControllers");

const router=express.Router();

router.post("/sendcomment",sendComment);
router.post("/getcommet",getComments);
router.delete("/deletecomment/:id",deleteComment);
router.delete("/deleteallcomment",deleteAllComment);

module.exports=router;