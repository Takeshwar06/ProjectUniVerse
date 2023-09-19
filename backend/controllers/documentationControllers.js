const Documentations = require("../models/documentationModel");


module.exports.addDocumentation = async (req, res, next) => {
    try {
        let fileUrl = null;
        const { heading, discription, project_id } = req.body;

        if (req.files) {
            const file = req.files.docImg;
            // console.log(req.file);
            cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
                fileUrl = result.url;
                const response = await Documentations.create({
                    heading, discription, project_id, image: fileUrl
                })
                res.json(response);
            })
        }
        else {
            const response = await Documentations.create({
                heading, discription, project_id, image: fileUrl
            })
            res.json(response);
        }

    } catch (error) {
        next(error);
    }
}

module.exports.upDateDocumentationImage = async (req, res, next) => {
    try {
        if (!req.files) {
            return res.status(400).send('No file uploaded.');
        }
        const file = req.files.docImg;
        // console.log(req.file);
        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            fileUrl = result.url;
            let response = await Documentations.updateOne({ _id: req.params.id },
                { $set: { image: fileUrl } });
            res.json(response);
        })

    } catch (error) {
        next(error);
    }
}

module.exports.deleteDocumentation = async (req, res, next) => {
    try {
        const response = await Documentations.deleteOne({ _id: req.params.id });
        res.json(response);
    } catch (error) {
        next(error);
    }
}

module.exports.upDateDocumentationText = async (req, res, next) => {
    try {
        const { heading, discription } = req.body;
        const response = await Documentations.updateOne({ _id: req.params.id },
            { $set: { heading, discription } });
        res.json(response);
    } catch (error) {
        next(error);
    }
}