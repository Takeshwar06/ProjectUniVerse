import React, { useContext, useEffect, useState } from 'react';
import '../CSS/Style.css'
import Navbar from '../Components/Navbar';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import GradeIcon from '@mui/icons-material/Grade';
import ProjectCard from '../Components/ProjectComponents/ProjectCard';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getStudentInfo } from '../utils/ApiRoutes'
import axios from 'axios';
import mainContext from '../Components/context/mainContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const searchQuery = useSearchParams()[0];
  const referenceId = searchQuery.get("referenceId"); // null or Id
  const { navbarRender, setNavbarRender } = useContext(mainContext);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      navigate("/auth");
    }
    else {
      if (referenceId) {
        fetchStudent(referenceId);
      } else fetchStudent(studentId);
    }
  }, [])
  const fetchStudent = async (studentId) => {
    try {
      const data = await axios.get(`${getStudentInfo}/${studentId}`);
      if (data.data.success === false) {
        toast.error(data.data.msg);
      } else {
        if (data.data) setStudent(data.data);
        if (!referenceId) setNavbarRender(!navbarRender); // trigger navbar to fetch data 
        // console.log(data.data);
      }

    } catch (error) {
      toast.error("Internal server error");
    }
  }

  // edit button handle
  const handleEdit = (e) => {
    localStorage.setItem("studentInfo", JSON.stringify(student));
    navigate('/edit-profile')
  }



  return (
    <>


      <div className="profle_container flex flex-col font-signika px-2">

        {!referenceId && <div className="heading_container flex  text-white items-center justify-between px-16 py-3 shadow-sm shadow-gray-500 ">
          <h1 className='profile_container_heading font-signika font-semibold text-gray-300 text-2xl ' >MY PROFILE SECTION</h1>
          <div className="edit_profile_box flex gap-6 items-center justify-center">

            {/* if user edit then show save and cancel button */}
            <button className='edit_button custom-button '
              onClick={handleEdit}
            >EDIT</button>
          </div>
        </div>}


        {/* user details strudents  */}
        {student && <div className="user_details text-white flex flex-wrap justify-center items-center px-0 gap-3 w-full h-full py-8 shadow-sm shadow-gray-600">

          {/* images name descr social links changed from 30vw */}
          <div className="imp_show flex flex-col items-center gap-6 px-2 py-2 min-w-[25vw]">

            {/* image name bio */}
            <div className="top_details flex flex-col items-center gap-5 px-[0vw]">

              {/* image and name */}
              <div className="name-and-image flex flex-col items-center gap-4 ">
                <div className="image_box ">
                  <img src={`${student.image.length > 0 ? student.image : "./Images/default.png"}`} alt="user" className='p-[0.2rem] transition-all duration-500 bg-slate-900 w-32 h-32 rounded-full cursor-pointer hover:bg-gray-400 shadow-xl shadow-blue-700 overflow-hidden' />
                </div>

                <h2 className='text-3xl font-semibold opacity-90'>
                  {student.name.length > 0 ? student.name.split(' ').slice(0, 2).join(' ') : "unknown-student"}
                </h2>
              </div>

              {/* bio of students */}
              <div className="bio w-full max-w-[34vw]">
                <p className='bio_details text-center text-xl custom-values' >
                  {student.bio.length > 0 ? student.bio.split(' ').slice(0, 20).join(' ') : `Write Bio ${student.name}`}
                </p>


              </div>



              {/* linlks of social media */}
              <div className='social_links flex flex-col gap-2 w-full pl-[5vw] text-xl'>
                {/* no of connections */}

                <div className="user_connections flex gap-3 w-full  text-xl">
                  <Diversity1Icon />
                  <span className='custom-values' >Connections : </span>
                  <span className='custom-values' >{student.connection}</span>
                </div>

                {/* My Website link */}
                <div className="website_link flex gap-3">
                  <LinkIcon className='' />
                  <Link to={(student.link.website.length) > 5 ? student.link.website : "#website"} className='custom-values' target={`${(student.link.website.length) > 5 ? "_blank" : ""}`} rel="noopener noreferrer">
                    {(student.link.website.length) > 5 ? student.link.website : "www.exm.come"}
                  </Link>
                </div>
                {/* linkedin link */}
                <div className="linkedin_link flex gap-3">
                  <LinkedInIcon className='' />
                  <Link to={(student.link.linkdin.length) > 5 ? student.link.linkdin : "#linkdin"} className='custom-values' target={`${(student.link.linkdin.length) > 5 ? "_blank" : ""}`} rel="noopener noreferrer">
                    {(student.link.linkdin.length) > 5 ? student.link.linkdin : "www.exm.come"}
                  </Link>
                </div>
                {/* github link */}
                <div className="github_link flex gap-3">
                  <GitHubIcon className='' />
                  <Link to={(student.link.github.length) > 5 ? student.link.github : "#github"} className='custom-values' target={`${(student.link.github.length) > 5 ? "_blank" : ""}`} rel="noopener noreferrer">
                    {(student.link.github.length) > 5 ? student.link.github : "www.exm.come"}
                  </Link>
                </div>

                {/* instagram link */}
                <div className="instagram_link flex gap-3">
                  <InstagramIcon className='' />
                  <Link to={(student.link.instagram.length) > 5 ? student.link.instagram : "#instagram"} className='custom-values' target={`${(student.link.instagram.length) > 5 ? "_blank" : ""}`} rel="noopener noreferrer">
                    {(student.link.instagram.length) > 5 ? student.link.instagram : "www.exm.come"}
                  </Link>
                </div>
              </div>

            </div>

          </div>


          {/* basic details of User */}
          <div className="basic_details flex flex-col  pl-9 h-full pt-7 px-0 gap-3 text-xl min-w-[400px]">

            {/* email */}
            <div className="user_email flex items-center  gap-3">
              <span className='small_heading' >Email : </span>
              <span className='custom-values' >{student.email.length > 0 ? student.email : "exm@exm.com"}</span>
            </div>

            {/* Collage */}
            <div className="user_collge flex items-center  gap-3">
              <span className='small_heading opacity-95' >Collage : </span>
              <span className='custom-values' >{student.college.length > 0 ? student.college : "exm univercity"}</span>
            </div>

            {/* Courses */}
            <div className="user_course flex items-center  gap-3">
              <span className='small_heading opacity-95' >Course : </span>
              <span className='custom-values' >{student.course.length > 0 ? student.course : "exm Course"}</span>
            </div>

            {/* Passout Year */}
            <div className="user_pass_year flex items-center  gap-3">
              <span className='small_heading opacity-95' >PassYear : </span>
              <span className='custom-values' >{student.passYear.length > 0 ? student.passYear : "exm-2222"}</span>
            </div>

            {/* SEM/ YEAR */}
            <div className="user_year_sem flex items-center  gap-3">
              <span className='small_heading opacity-95' >Sem/Year : </span>
              <span className='custom-values' >{student.sem_year.length > 0 ? student.sem_year : "exm-2"}</span>
            </div>

            <div className="user_location flex items-center  gap-3">
              <span className='small_heading opacity-95' >Location : </span>
              <span className='custom-values' >{student.location.length > 0 ? student.location : "exm city exm area"} </span>
            </div>

          </div>


          { }
          <div className="user_all_skills flex items-center flex-col px-3  pt-7 gap-1  text-xl ">

            {/* technology used */}
            <div className="technologies_names flex max-w-[82%] flex-col items-center gap-3">
              {/* technology listed options */}
              <div className='show_technologies flex flex-col gap-1 items-center justify-center'>
                <span className='small_heading' >Technology : </span>

                {/* selections of technologies */}
                <div className="selected_technology  flex  flex-wrap items-center justify-center gap-1 w-full">

                  {
                    student.technology.map((name) => {
                      return (
                        <React.Fragment key={name}>
                          {/* one selected */}
                          <div className="technology_box selected_options px-1">
                            <span>{name}</span>
                          </div>
                        </React.Fragment>
                      )
                    })
                  }
                </div>
              </div>
            </div>


            {/* Core Programming Lnagugae */}
            <div className="programming_language_names flex flex-col gap-3">
              {/* programming language listed options */}
              <div className='show_programming_language flex-col flex-2 flex-3 gap-1'>
                <span className='small_heading' >Programming : </span>

                {/* selections of Programming */}
                <div className="selected_programming_language flex justify-center items-center gap-1">
                  {
                    student.programming.map((name) => {
                      return (
                        <React.Fragment key={name}>
                          {/* one selected */}
                          <div className="language_box selected_options px-1" >
                            <span>{name}</span>
                          </div>
                        </React.Fragment>
                      )
                    })
                  }
                </div>
              </div>
            </div>


            {/* my rating */}
            <div className="user_rating flex items-center my-1 justify-center gap-3 ">
              <span className='small_heading'>My Rating :-</span>
              <div className="rating_box">
                <GradeIcon className='grade_icon' />
                <GradeIcon className='grade_icon' />
                <GradeIcon className='grade_icon' />
                <GradeIcon className='grade_icon' />
                <GradeIcon className='grade_icon' />
              </div>
            </div>

            {/* send message to user */}
            <div className="send_message_button my-1">
              <button className="send_message custom-button">SEND MESSAGE</button>
            </div>
          </div>
        </div>}

        {/* all projects container with headings  */}

        {student&&<ProjectCard studentId={student._id} />}

      </div>
    </>
  )
}

export default Profile
