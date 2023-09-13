const Connections=require("../models/connectionModel");


module.exports.connectionRequest=async(req,res,next)=>{
    try {
        const {sender_id,sender_img,sender_name,request,}=req.body;
        const response=await Connections.create({
            sender_id,
            sender_img,
            sender_name,
            request,
        })
        res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports.connectionAccept=async(req,res,next)=>{
    try {
        const {receiver_id,receiver_name,receiver_img,accepted}=req.body;
        // check again update right or not for all
        const response=await Connections.updateOne({_id: req.params.id },
            { $set: { 
                receiver_id,
                receiver_name,
                receiver_img,
                accepted
             } });
             res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports.getConnections=async(req,res,next)=>{
    try {
        const {receiver_id,request,accepted}=req.body;
        const response=await Connections.find({receiver_id,request,accepted});
        res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports.connectionReject=async(req,res,next)=>{
    try {
        const {request}=req.body;
        const response=await Connections.deleteOne({_id:req.params.id});
        res.json(response);
    } catch (error) {
        next(error);
    }
}

