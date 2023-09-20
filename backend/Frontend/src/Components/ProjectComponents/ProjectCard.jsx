import React, { useEffect,useState } from 'react'
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getProjects } from '../../utils/ApiRoutes';

const ProjectCard = ({studentId}) => {
      const [projects,setProjects]=useState([]);
    useEffect(()=>{
       fetchProjects();
    },[])

    const fetchProjects=async()=>{
         const data = await axios.post(getProjects,{student_id:studentId});
         console.log(data);
         setProjects(data.data);
    }
    return (
        <>
            {/* all projects container with headings  */}
            <div className="all_projects_container text-white px-2  flex flex-col items-center justify-center w-full py-9 gap-5 shadow-sm shadow-gray-600">
                {/* heding part */}
                <div className="disclaimers items-center flex w-full justify-center">
                    <h2 className='font-signika font-semibold text-gray-300 text-2xl ' >CHECKOUT MY PROJECTS</h2>
                    {/* need filter button ongoing completed */}
                </div>

                {/* container contains all projects box */}
                <div className="projects_container flex py-4 gap-9 flex-wrap items-center justify-center ">
               

               {/* projects box */}
               {
                projects.map((project)=>{
                   
                    return(
                        <>
                        <div className="project_box flex flex-col items-center bg-[#262643] rounded-md px-4 gap-2 min-w-[341px] py-6 shadow-sm shadow-blue-300 ">
                        <div className="status flex justify-center gap-2 items-center">
                            <span className="status text-xl text-green-500">{project.onGoing?"OnGoing":"Complete"}</span>
                            {project.onGoing?<CallMissedOutgoingIcon />: <FactCheckIcon />}
                        </div>
                        <div className="project_name flex gap-3  w-full ">
                            <span className='project_name small_heading text-gray-200 text-[1.2rem]' >PROJECT : </span>
                            <span className='name_value text-[1.08rem]' >
                                {project.titel.length<20?project.titel.toUpperCase():(project.titel.substring(0,20).concat("..").toUpperCase())}
                            </span>
                        </div>
                        <div className="technology_name project_name flex gap-3 items-center w-full">
                            <span className='technology_name small_heading text-gray-200  text-[1.2rem]' >Technology : </span>
                            <span className='technology_value text-[1.08rem]' >
                               {project.usedTechnology.length<20?project.usedTechnology:(project.usedTechnology.substring(0,20).concat(".."))}
                            </span>
                        </div>
                        <div className="project_name project_name flex gap-3 items-center w-full">
                            <span className='description_name small_heading text-gray-200  text-[1.2rem]' >Description : </span>
                            <span className='description_value text-[1.08rem]' >
                            {project.discription.length<20?project.discription:(project.discription.substring(0,20).concat(".."))}
                            </span>
                        </div>
                        <Link to={`/project?PROJECTID=${project._id}`} className='py-[1px] px-2 w-fit bg-green-700  opacity-95 hover:text-slate-200 transition-all duration-300 rounded-md text-xl shadow-sm shadow-pink-300 font-signika relative top-2' >SEE PROJECT</Link>
                    </div>
                        </>
                    )
                })
               }
    
                </div>
            </div>

        </>
    )
}

export default ProjectCard
