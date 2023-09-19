const Projects = require("../models/projectModel");
const unzipper = require('unzipper');
const path = require("path");
const fs = require("fs");

module.exports.upLoadProject = async (req, res, next) => {
    try {  
        const { titel, discription, student_id, usedTechnology, onGoing} = req.body;
        let folderStructure;
        let { originalname } = req.file;
        const folderName = originalname.slice(0, -4);
        originalname = originalname.split(" ").join("");   
        const zipBuffer = req.file.buffer;
        const myPath = `Projects/${student_id}`
        const newFileName = `${Date.now()}_${originalname}`

        // make dir
        if (!fs.existsSync(myPath)) {
            fs.mkdirSync(myPath, { recursive: true });
        }
        // uploading file
         fs.writeFileSync(`${myPath}/${newFileName}`, zipBuffer);
        let fileUrl = `${req.protocol}://${req.get('host')}/${myPath}/${newFileName}`;
         fileUrl=fileUrl.replace("/Projects",""); // remove /Projects from url
        // extract zip file

        const zipFilePath = `./${myPath}/${newFileName}`; // Replace with the path to your ZIP file
        const extractionDir = `./${myPath}`; // Replace with the extraction destination

        fs.createReadStream(zipFilePath)
            .pipe(unzipper.Extract({ path: extractionDir }))
            .on('entry', (entry) => {
                const entryPath = `${extractionDir}/${entry.path}`;
                if (entry.type === 'Directory') {
                    // Create directory if it doesn't exist
                    fs.mkdirSync(entryPath, { recursive: true });
                } else {
                    // Create a write stream for the file
                    const writeStream = fs.createWriteStream(entryPath);
                    entry.pipe(writeStream);
                } 
            })
            .on('close', async () => {
                console.log(`ZIP file extracted to ${extractionDir}`);
                // calling folderTraverse
                const folderPathToTraverse = `./${myPath}/${folderName}`;
                folderStructure = buildFolderStructure(folderPathToTraverse);
                const project = await Projects.create({
                onGoing,titel, discription, student_id, usedTechnology, filePath: fileUrl, folderStructure
                })
                // res.status(200).json({msg:"Profile Created SuccessFully"});
                // return res.json({ success: true, msg: "project upload with info" })
                res.json(project);

            })
            .on('error', (err) => {
                res.json({success:false,msg:"project not uploaded"})
                console.error('Error extracting ZIP file:', err);
            });

        // folder structure 
        function buildFolderStructure(folderPath) {
            const stats = fs.statSync(folderPath);
            if (!stats.isDirectory()) {
                return null; // Not a folder
            }

            const folderName = path.basename(folderPath);
            const children = [];

            const files = fs.readdirSync(folderPath);
            files.forEach(file => {
                const filePath = path.join(folderPath, file);
                const fileStats = fs.statSync(filePath);

                if (fileStats.isDirectory()) {
                    const childFolder = buildFolderStructure(filePath);
                    if (childFolder) {
                        children.push(childFolder);
                    }
                } else if (fileStats.isFile()) {
                    children.push({
                        type: 'file',
                        name: file,
                        path: filePath.replace(/\\/g,"/").replace("Projects",""),
                    });
                }
            });

            return {
                type: 'folder',
                name: folderName,
                children,
            };
        }
        // // folderStructure=[{type:"folder",name:"tiger",children:[{type:"file",name:"tiger.txt",path:"http://fjfjf"}]}]

    } catch (error) {
        next(error);
    }
}

module.exports.upDateProjectFile = async (req, res, next) => {
    try {
        const {student_id}=req.body;
        let { originalname } = req.file;   
        let folderStructure;
        const folderName = originalname.slice(0, -4);
        originalname = originalname.split(" ").join("");
        const zipBuffer = req.file.buffer;
        const myPath = `Projects/${student_id}`
        const newFileName = `${Date.now()}_${originalname}`
        // make dir
        if (!fs.existsSync(myPath)) {
            fs.mkdirSync(myPath, { recursive: true });
        }
        // uploading file
        fs.writeFileSync(`${myPath}/${newFileName}`, zipBuffer);
        let fileUrl = `${req.protocol}://${req.get('host')}/${myPath}/${newFileName}`;
        fileUrl=fileUrl.replace("/Projects",""); // remove /Projects from url

        // extract file
        const zipFilePath = `./${myPath}/${newFileName}`; // Replace with the path to your ZIP file
        const extractionDir = `./${myPath}`; // Replace with the extraction destination

        fs.createReadStream(zipFilePath)
            .pipe(unzipper.Extract({ path: extractionDir }))
            .on('entry', (entry) => {
                const entryPath = `${extractionDir}/${entry.path}`;
                if (entry.type === 'Directory') {
                    // Create directory if it doesn't exist
                    fs.mkdirSync(entryPath, { recursive: true });
                } else {
                    // Create a write stream for the file
                    const writeStream = fs.createWriteStream(entryPath);
                    entry.pipe(writeStream);
                }
            })
            .on('close', async () => {
                console.log(`ZIP file extracted to ${extractionDir}`);
                // calling folderTraverse
                const folderPathToTraverse = `./${myPath}/${folderName}`;
                folderStructure = buildFolderStructure(folderPathToTraverse);
                const response = await Projects.updateOne({ _id:req.params.id }, {
                    $set: {
                        filePath: fileUrl, folderStructure
                    }
                })
                // res.status(200).json({msg:"Profile Created SuccessFully"});
                // return res.json({ success: true, msg: "project upload with info" })
                res.json(response);

            })
            .on('error', (err) => {
                console.error('Error extracting ZIP file:', err);
            });

        // folder structure 
        function buildFolderStructure(folderPath) {
            const stats = fs.statSync(folderPath);
            if (!stats.isDirectory()) {
                return null; // Not a folder
            }

            const folderName = path.basename(folderPath);
            const children = [];

            const files = fs.readdirSync(folderPath);
            files.forEach(file => {
                const filePath = path.join(folderPath, file);
                const fileStats = fs.statSync(filePath);

                if (fileStats.isDirectory()) {
                    const childFolder = buildFolderStructure(filePath);
                    if (childFolder) {
                        children.push(childFolder);
                    }
                } else if (fileStats.isFile()) {
                    children.push({
                        type: 'file',
                        name: file,
                        path: filePath.replace(/\\/g,"/").replace("Projects",""),
                    });
                }
            });

            return {
                type: 'folder',
                name: folderName,
                children,
            };
        }
     
       
    } catch (error) {
        next(error);
    }
}

module.exports.getProjects=async(req,res,next)=>{
    try {
        const {student_id}=req.body;
        const data=await Projects.find({student_id},{_id:1,titel:1,discription:1,usedTechnology:1,onGoing:1});
        res.json(data);
    } catch (error) {
        next(error);
    }
}

module.exports.getProject=async(req,res,next)=>{
    try {
        const project=await Projects.find({_id:req.params.id});
        res.json(project);
    } catch (error) {
        res.json({success:false,msg:"internal server error"})
        next(error);
    }
}

module.exports.getCode=async(req,res,next)=>{
    try {
        const {path}=req.body;
        fs.readFile(`Projects${path}`,(err,data)=>{
            // console.log(data);
            res.send(data);
        })
    } catch (error) {
        
    }
}