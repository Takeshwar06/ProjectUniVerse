const Documentations = require("../models/documentationModel");


module.exports.addDocumentation = async (req, res, next) => {
    try {
        let fileUrl = null;
        if (req.file) {
            let { originalname } = req.file;
            originalname = originalname.split(" ").join("");
            const zipBuffer = req.file.buffer;
            const myPath = `uploads/documentation`
            const newName = `${Date.now()}_${originalname}`

            if (!fs.existsSync(myPath)) {
                fs.mkdirSync(myPath, { recursive: true });
            }
            fs.writeFileSync(`${myPath}/${newName}`, zipBuffer);
            fileUrl = `${req.protocol}://${req.get('host')}/${myPath}/${newName}`;
        }
        const { heading, discription, project_id } = req.body;
        const response = Documentations.create({
            heading, discription, project_id, image: fileUrl
        })
        res.json(response);

    } catch (error) {
        next(error);
    }
}

module.exports.upDateDocumentationImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        let { originalname } = req.file;
        originalname = originalname.split(" ").join("");
        const zipBuffer = req.file.buffer;
        const myPath = `uploads/documentation`
        const newName = `${Date.now()}_${originalname}`

        if (!fs.existsSync(myPath)) {
            fs.mkdirSync(myPath, { recursive: true });
        }

        fs.writeFileSync(`${myPath}/${newName}`, zipBuffer);
        const fileUrl = `${req.protocol}://${req.get('host')}/${myPath}/${newName}`;
        let response = await Documentations.updateOne({ _id: req.params.id },
            { $set: { image: fileUrl } });
        res.json(response);

    } catch (error) {
        next(error);
    }
}

module.exports.deleteDocumentation=async(req,res,next)=>{
    try {
        const response=await Documentations.deleteOne({_id:req.params.id});
        res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports.upDateDocumentationText=async(req,res,next)=>{
    try {
        const {heading ,discription}=req.body;
        const response=await Documentations.updateOne({ _id: req.params.id },
            { $set: {heading,discription}});
        res.json(response);
    } catch (error) {
        next(error);
    }
}