import React, { useState } from 'react'
// we need component and css 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// circular progress
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// axios for fetching api
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signUpStudent } from '../utils/ApiRoutes'


const Signup = () => {

    const navigate = useNavigate();
    const [student, setStudent] = useState({ name: "", email: "", password: "", cpassword: "" });

    // state for loading to upload picture of user
    const [loading, setLoading] = useState(false);

    // toggle password value show/hide
    const [showPass, setShowPass] = useState(false);
    const toggleShow = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    }


    // when clicked to sign up then handle
    const handleSignup = async (e) => {

        e.preventDefault();
        // set loading is true
        setLoading(true);

        // check all is valid  or not
        if (!student.name || !student.email || !student.password || !student.cpassword) {
            toast.warn("Please Fill All Fields");
            setLoading(false);
            return;
        }

        // check password === cpassword
        if (student.password !== student.cpassword) {
            toast.warn("Password should be same");
            setLoading(false);
            return;
        }

        try {
            // signup student
            const data = await axios.post(signUpStudent, {
                name: student.name,
                email: student.email,
                password: student.password,
            })

            if (data.data.success === true) {
                localStorage.setItem("studentId", data.data.student_id);
                toast.success("Registration is successfull");
                navigate('/profile');
                setLoading(false);
            }
            else toast.error(data.data.msg);
            setLoading(false);
            //  if successfully done
            // goto /profile to complete their profile
        }
        catch (error) {
            console.log(error);
            toast.error("Internal server error");
            setLoading(false);
        }
    }


    const handleInputChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    }
    return (
        <>
            {/*👉 CREATE ACCOUNT FOROM */}

            <form action="" className="create_form  w-[35rem]  px-16 flex flex-col gap-5 py-9" >

                {/* for input name */}
                <div className="name_box flex flex-col gap-2">
                    <label htmlFor="create_input_name" className='text-xl  font-[600] opacity-70'>Name *</label>
                    <input
                        value={student.name}
                        onChange={(e) => handleInputChange(e)} // set value when change
                        type="text" name="name" id="create_input_name" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Your Name' />
                </div>

                {/* for input type email */}
                <div className="email_box flex flex-col gap-2">
                    <label htmlFor="create_input_email" className='text-xl  font-[600] opacity-70'>Email Address *</label>
                    <input
                        value={student.email}
                        onChange={(e) => handleInputChange(e)} // set value when change
                        type="email" name="email" id="create_input_email" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Your Email Address' autoComplete="on" />
                </div>

                {/* for input type password */}
                <div className="password_box flex flex-col gap-2">
                    <label htmlFor="create_input_password" className='text-xl  font-[600] opacity-70'>Password *</label>
                    <div className="password flex items-center ">
                        <input
                            value={student.password}
                            onChange={(e) => handleInputChange(e)} // set value when change
                            type={showPass ? 'text' : 'password'} name="password" id="create_input_password" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Password' autoComplete="new-password" />
                        <button tabIndex="-1" onClick={toggleShow} className="show_button bg-gray-200 py-1 px-2 rounded-md">{showPass ? 'Hide' : 'Show'}</button>
                    </div>
                </div>

                {/* for confirm input type password */}
                <div className="password_box flex flex-col gap-2">
                    <label htmlFor="create_input_cpassword" className='text-xl  font-[600] opacity-70'>Confirm Password *</label>
                    <div className="password flex items-center ">
                        <input
                            value={student.cpassword}
                            onChange={(e) => handleInputChange(e)} // set value when change
                            type={showPass ? 'text' : 'password'} name="cpassword" id="create_input_cpassword" className='py-1 px-3 w-full bg-gray-100' placeholder='Confirm Password' autoComplete="new-password" />
                        <button tabIndex="-1" onClick={toggleShow} className="show_button bg-gray-200 py-1 px-2 rounded-md">{showPass ? 'Hide' : 'Show'}</button>
                    </div>
                </div>

                {/* upload your picture */}
                <div className="password_box flex flex-col gap-2">
                    <label htmlFor="create_input_picture" className='text-xl  font-[600] opacity-70'>Upload Your Picture </label>
                    {/* only accept image */}
                    <input type="file" accept='image/*'
                        // input image handle by postDetail method

                        name="create_input_picture" id="create_input_picture" className='py-1 px-3 w-full bg-gray-100' placeholder='Confirm Password' />
                </div>

                {/* input button to create user */}
                <div className="button_box flex flex-col justify-center py-4 items-center gap-4">
                    <button
                        // signup button
                        onClick={handleSignup}
                        disabled={loading}
                        className='bg-blue-600 w-full py-[5px] rounded opacity-90 text-white text-xl hover:bg-blue-700 text-opacity-90 '
                    >
                        {/* button content is changing to circluar progress when upload image */}
                        {loading ?
                            (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress color="inherit" size={28} />
                            </Box>
                            ) : ('Sign Up')}
                    </button>
                </div>

            </form>


            {/* the toastify alert is added here */}
            <ToastContainer />
        </>
    )
}

export default Signup
