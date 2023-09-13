const Comments=require("../models/commentModel");

module.exports.sendComment=async(req,res,next)=>{
    try {
        const {comment,project_id,student_id,student_img}=req.body;
        const response=await Comments.create({
            comment,project_id,student_id,student_img
        })
        res.json(response);
          
    } catch (error) {
        next(error);
    }
}
module.exports.getComments=async(req,res,next)=>{
    try {
        const {project_id}=req.body;
        const comments=await Comments.find({project_id});
        res.json(comments);

    } catch (error) {
        next(error);
    }
    // comment
}

module.exports.deleteComment=async(req,res,next)=>{
    try {
        const response=await Comments.deleteOne({_id:req.params.id})
        res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteAllComment=async(req,res,next)=>{
    try {
        const {project_id}=req.body;
        const response=await Comments.deleteMany({project_id});
        res.json(response);
    } catch (error) {
        next(error);
    }
}