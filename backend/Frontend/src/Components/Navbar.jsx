import React, { useContext, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MessageIcon from '@mui/icons-material/Message';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';


// include css of navbar
import '../CSS/Navbar.css';
import UploadProject from './ProjectComponents/UploadProject';
import mainContext from './context/mainContext';
import { getStudentInfo } from '../utils/ApiRoutes';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { navbarRender,setNavbarRender } = useContext(mainContext);
    const [navStudent, setNavStudent] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("studentId"))
            fetchStudent(localStorage.getItem("studentId"));
    }, [navbarRender]);

    const fetchStudent = async (studentId) => {
        try {
            const data = await axios.get(`${getStudentInfo}/${studentId}`);
            if (data.data.success===false) {toast.error(data.data.msg);}
            else setNavStudent(data.data);
        } catch (error) {
            toast.error("Internal server error");
        }
    }
    // using for navigation
    const navigate = useNavigate();

    // making state when true then show upload project modal and false then hide
    const [showUpload, setShowUpload] = useState(false);
    // when cicked to upload project then show upload profile comonent
    const showUploadProjectBox = (event) => {
        event.preventDefault();
        // 
        setShowMenu(!showMenu);
        console.log("upload project is clicked navbar");
        setShowUpload(true);
    }
    // close popup when cancel or upload
    const closePopup = () => {
        setShowUpload(false);
    }

    // When mobile size then toggle navbar using menu_bar button
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = (e) => {
        e.preventDefault();
        setShowMenu(!showMenu);
    }

    // need state : when mobile size then convert menu icons to texts
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

    useEffect(() => {
        // Update the isMobile state when the window is resized
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1100);
        };
        // when window resize then call handleResize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            {/* navbar container */}
            <nav id="navbar" className={`nav_container ${!localStorage.getItem("studentId") && "do-not-show "} text-white flex items-center justify-between px-60 h-16 bg-slate-800 min-w-full`} >
                {/* header section left part */}
                <div className="header flex items-center gap-7">
                    <Tooltip title="Go-to-Profile " arrow>
                        <Link to="/profile" className="menu_link p-[.1rem] flex rounded-full custom-transtion hover:bg-slate-700 shadow-lg shadow-blue-700">
                            <img src={`${navStudent && (navStudent.image.length > 0 ? navStudent.image : "./images/default.png")}`} alt="user" className='w-9 h-9 rounded-full' srcSet="" />
                        </Link>
                    </Tooltip>
                    <Link to="/" className='user_name font-bree text-2xl hover:opacity-90 custom-transtion ' >{navStudent && (navStudent.name.split(' ').slice(0, 2).join(' '))}{!navStudent && "unknown-student"}</Link>
                </div>
                {/* right part */}
                <ul
                    style={{ left: showMenu ? '0%' : '100%' }}
                    className='menu_links flex items-center justify-center gap-2' >

                    {/* upload project menu link */}
                    <li>
                        <Link to="/" className="menu_link custom-nav-link ">

                            {/* we changing content when mobile size  */}
                            {
                                !isMobile ? (
                                    <>
                                        <Tooltip title="New Project" arrow className='custom-tooltip'>
                                            <CloudUploadIcon
                                                onClick={showUploadProjectBox}
                                                id="upload_project" />
                                        </Tooltip>
                                    </>
                                ) : (
                                    <h3 className='custom-menu-link'
                                        onClick={showUploadProjectBox}
                                    >Upload Project</h3>
                                )
                            }

                        </Link>
                    </li>

                    {/* Notification menu link */}
                    <li>
                        <Link to="/" className="menu_link flex items-center justify-center hover:bg-slate-700 px-3 py-2 custom-transtion hover:opacity-90 rounded-2xl ">

                            {/* we changing content when mobile size  */}
                            {
                                !isMobile ? (
                                    <>
                                        <Tooltip title="Notification" arrow>
                                            <NotificationsIcon className='' />
                                        </Tooltip>
                                    </>
                                ) : (
                                    <h3 className='custom-menu-link'
                                        //Also Close reponsive menu when cicked
                                        onClick={(e) => { e.preventDefault(); setShowMenu(!showMenu) }}
                                    >Notifications</h3>
                                )
                            }
                        </Link>
                    </li>
                    {/* Message icon menu link */}
                    <li>
                        <Link to="/message" className="menu_link flex items-center justify-center hover:bg-slate-700 px-3 py-2 custom-transtion hover:opacity-90 rounded-2xl ">
                            {/* we changing content when mobile size  */}
                            {
                                !isMobile ? (
                                    <>
                                        <Tooltip title="Message" arrow>
                                            <MessageIcon className='' />
                                        </Tooltip>
                                    </>
                                ) : (
                                    <h3 className='custom-menu-link'
                                        //Also Close reponsive menu when cicked
                                        onClick={(e) => { e.preventDefault(); setShowMenu(!showMenu); navigate('/message') }}
                                    >My Messages</h3>
                                )
                            }
                        </Link>
                    </li>
                    {/* Logout icon menu link */}
                    <li>
                        <Link to="/auth" className="menu_link flex items-center justify-center hover:bg-slate-700 px-3 py-2 custom-transtion hover:opacity-90 rounded-2xl ">
                            {/* we changing content when mobile size  */}
                            {
                                !isMobile ? (
                                    <>
                                        <Tooltip title="Logout" arrow>
                                            <LogoutIcon onClick={() => { localStorage.removeItem("studentId"); localStorage.removeItem("studentInfo")}} className='' />
                                        </Tooltip>
                                    </>
                                ) : (
                                    <h3 className='custom-menu-link'
                                        //Also Close reponsive menu when cicked
                                        onClick={(e) => { e.preventDefault(); setShowMenu(!showMenu); setNavbarRender(!navbarRender); localStorage.removeItem("studentId"); navigate("/auth") }}
                                    >Logout</h3>
                                )
                            }
                        </Link>
                    </li>
                </ul>

                {/* menu button which is visible when mobile screen */}
                <Link to="/" className="menu_bar rounded-md flex custom-transtion ">

                    <MenuIcon
                        onClick={toggleMenu}
                        className="hover:opacity-80" style={{ fontSize: '2.5rem', display: showMenu ? 'none' : 'block' }} />
                    <CloseIcon
                        onClick={toggleMenu}
                        className="hover:opacity-80" style={{ fontSize: '2.5rem', display: showMenu ? 'block' : 'none' }} />

                </Link>
            </nav>


            {
                showUpload ? <UploadProject onClose={closePopup} /> : ""
            }
        </>
    )
}

export default Navbar
