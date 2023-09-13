const Notifications=require("../models/notificationModel");


module.exports.sendNotification=async(req,res,next)=>{
    try {
        // notificationFor:student_id(reciever)
        const {type,message,notificationFor,s_name,s_img,s_id}=req.body;
        const response=await Notifications.create({
            senderStudent:{s_id,s_img,s_name},
            type,message,notificationFor
        })
        res.json(response);
    } catch (error) {
        next(error);
    }
}


module.exports.deleteNotification=async(req,res,next)=>{
    try {
        const response=await Notifications.deleteOne({_id:req.params.id});
        res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteAllNotification=async(req,res,next)=>{
    try {
          const {student_id}=req.body;
          const response=await Notifications.deleteMany({notificationFor:student_id});
          res.json(response);
    } catch (error) {
        next(error);
    }
}