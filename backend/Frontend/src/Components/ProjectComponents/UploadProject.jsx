import React, { useState } from 'react'
// we need component and css 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// circular progress
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// axios for fetching api
// import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../../CSS/Style.css';
import axios from 'axios';
import { upLoadProject } from '../../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';

const UploadProject = ({ onClose }) => {

    const navigate=useNavigate();
    // getting project name
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [onGoing, setOnGoing] = useState(false);
    const [allTechnology, setAllTechnology] = useState("");
    const [projectFile,setProjectFile]=useState(null);

    const [loading, setLoading] = useState(false);


    // UPLOAD WHOLE FORM WITH PROJECT FOLDER IN SERVER 
    const uploadProject = async(event) => {
        event.preventDefault();
        if(!localStorage.getItem("studentId"))return;
        if(!projectFile){
            toast.warn("Please select a zip file")
            return;
        }
        // validate checking all data to not empty
        if (projectName.length<1 || description.length<1|| allTechnology.length <1) {
            toast.warn("Please fill all inputs");
            return;
        }
       
        setLoading(true);
        // POSTING ON API TO DATA
        const formData=new FormData();
        formData.append("titel",projectName);
        formData.append("discription",description);
        formData.append("usedTechnology",allTechnology);
        formData.append("onGoing",onGoing);
        formData.append("projectFile",projectFile);
        formData.append("student_id",localStorage.getItem("studentId"));
        const data = await axios.post(upLoadProject,formData);
        if(data.data.success===false){
            toast.error(data.data.msg);
            return;
        }
        // do empty in input fields
        setProjectName("");
        setDescription("");
        setOnGoing(false);
        setAllTechnology("");
        setProjectFile(null);


       toast.success("Folder uploaded!");
       setLoading(false);
       onClose();
       navigate(`/project?PROJECTID=${data.data._id}`)

    }


    return (
        <>
            <div className="project_upload z-50 transition fixed top-2 left-2/4 right-2/4 font-signika flex flex-col justify-center items-center pt-7 gap-2  ">

                {/* this includes heading part */}
                <div className="login_heading bg-white rounded-md w-[35rem]  py-3 flex justify-center items-center">
                    <h1 className=' text-2xl font-semibold  opacity-80 tracking-wide' >Upload Your Project</h1>
                </div>

                {/*  this includes upload content part */}
                <div className="upload_part bg-white rounded-md  w-[35rem]  py-0 flex justify-center items-center flex-col ">

                    {/*👉 CREATE UPLOAD PROJECT FOROM */}

                    <form action="" className="create_form  w-[35rem]  px-16 flex flex-col gap-3 pt-4 pb-5" >

                        {/* for input project name */}
                        <div className="name_box flex flex-col gap-2">
                            <label htmlFor="input_project_name" className='text-[1.2rem]  font-[600] opacity-70'>Name of Project </label>
                            <input
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)} // set value when change
                                type="text" name="input_project_name" id="input_project_name" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Your Name' />
                        </div>

                        {/* for input description  */}
                        <div className="description_box flex flex-col gap-2">
                            <label htmlFor="input_project_description" className='text-[1.2rem]  font-[600] opacity-70'>Project Description </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} // set value when change
                                name="input_project_description" id="input_project_description" className='py-1 px-3 w-full bg-gray-100'
                                placeholder='Project Description' autoComplete="on" >
                            </textarea>
                        </div>

                        {/* for input TECHNOLOGY used  */}
                        <div className="technology_box flex flex-col gap-2">
                            <div className="technology_ongoing flex justify-between items-center">
                                <label htmlFor="input_project_technology" className='text-[1.2rem]   font-[600] opacity-70'>Technology Used </label>
                                <div className="status flex justify-center items-center gap-2 pr-6">
                                    <input type="checkbox" name="" id="project_status"
                                        value={onGoing}
                                        onClick={(e) => setOnGoing(e.target.checked)}
                                    />
                                    <label htmlFor="project_status">OnGoing</label>
                                </div>
                            </div>
                            <textarea
                                value={allTechnology} // getting forom of string and then array converted
                                onChange={(e) => setAllTechnology(e.target.value)} // set value when change
                                name="input_project_technology" id="input_project_technology" className='py-1 px-3 h-8 w-full bg-gray-100'
                                placeholder="HTML, CSS, JS, REACT" autoComplete="on" >
                            </textarea>

                        </div>


                        {/* for folder input  */}
                        <div className="description_box flex flex-col gap-1">
                            <h3 htmlFor="input_project_folder" className='text-[1.2rem]  font-[600] opacity-70 pb-2'>Upload Folder</h3>

                            {/* Drag and drop feature implemented */}
                            <div className="drag-drop hover:bg-slate-100 custom-transition cursor-pointer flex-all border-2 h-40 rounded-xl border-dashed border-slate-400"
                                draggable="true">
                                <div className="drop">
                                    <CloudUploadIcon className='text-blue-600' style={{ fontSize: '6rem' }} />
                                </div>
                                <div className="message w-4/6 flex justify-center items-center">
                                    <label htmlFor='input_project_folder' className='text-[1.2rem]  text-center' >Drag and drop or
                                        <span className='text-blue-700' > click here </span>
                                        to upload image</label>
                                </div>
                            </div>

                            {/* can also made default file choosing system */}
                            <input type="file"
                                id="input_project_folder"
                                // webkitdirectory=""
                                onChange={e=>setProjectFile(e.target.files[0])}
                                className='hidden'
                            />
                        </div>

                        {/* input button to upload project */}
                        <div className="button_box flex  justify-center pt-3 items-center gap-4">
                            <button
                                // Upload Project button
                                onClick={uploadProject}
                                disabled={loading}
                                className='bg-blue-600 py-1 w-full rounded opacity-90 text-white text-[1rem] hover:bg-blue-700 text-opacity-90 '
                            >
                                {/* button content is changing to circluar progress when upload image */}
                                {loading ?
                                    (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <CircularProgress color="inherit" size={28} />
                                    </Box>
                                    ) : ('UPLOAD-PROJECT')}
                            </button>
                            {/* Cancel button */}
                            <button
                                onClick={onClose}
                                className='bg-blue-600 w-full py-1 rounded opacity-90 text-white text-[1rem] hover:bg-blue-700 text-opacity-90 '
                            >CANCEL</button>
                        </div>

                    </form>

                </div>
            </div>


            {/* the toastify alert is added here */}
            <ToastContainer />
        </>
    )
}

export default UploadProject
