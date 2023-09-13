const express=require("express");
const { connectionRequest, connectionAccept, connectionReject, getConnections } = require("../controllers/connectionControllers");

const router=express.Router();

router.post("/connectionrequest",connectionRequest);
router.post("/connectionaccept",connectionAccept);
router.post("/getconnections",getConnections);
router.delete("/connectionreject",connectionReject);

module.exports=router;