const express=require("express");
const { sendNotification, deleteNotification, deleteAllNotification } = require("../controllers/notificationControllers");

const router=express.Router();

router.post("/sendnotification",sendNotification);
router.delete("/deletenotification",deleteNotification);
router.delete("/deleteallnotification",deleteAllNotification);

module.exports=router;