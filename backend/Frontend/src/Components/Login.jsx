import React, { useState } from 'react'
// we need component and css 
import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
// circular progress
import CircularProgress from '@mui/material/CircularProgress'; // button which round when process
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logInStudent } from '../utils/ApiRoutes';

const Login = () => {

    // used for navigation page
    const navigate = useNavigate();

    // getting login email
    const [email, setEmail] = useState('');
    // getting login password
    const [password, setPassword] = useState('');

    // new state for loading to upload picture of user
    const [loading, setLoading] = useState(false);

    // toggle password value
    const [showPass, setShowPass] = useState(false);
    const toggleShow = (event) => {
        event.preventDefault();
        setShowPass(!showPass);
    }

    // handle login when clicked login button
    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true); //Procesing circle
        // check values empty is wrong
        if (!email || !password) {
            toast.warn("Please fill All Inputs");
            setLoading(false);
            return;
        }
        // if all values is filled
        try {

            // HERE IS MY POST REQUEST CODE --------------
            const data=await axios.post(logInStudent,{email,password});

            // if all done successfully then
            if(data.data.success===true){
                toast.success("Successfully Login");
                localStorage.setItem("studentId",data.data.student_id);
                navigate("/profile");
            }
            else toast.error(data.data.msg);
            setLoading(false);
        } catch (error) {
            toast.error("Invalid User");
            setLoading(false);
        }

    }


    return (
        <>

            {/*👉 LOGIN FOROM of login user */}
            <form action="" className="login_form w-[35rem]  px-16 flex flex-col gap-5 py-9" >
                {/* for input type email */}
                <div className="email_box flex flex-col gap-2">
                    <label htmlFor="login_input_email" className='text-xl  font-[600] opacity-70'>Email Address *</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" name="login_input_email" id="login_input_email" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Your Email Address' autoComplete="on" />
                </div>
                {/* for input type password */}
                <div className="password_box flex flex-col gap-2">
                    <label htmlFor="login_input_password" className='text-xl  font-[600] opacity-70'>Password *</label>
                    <div className="password flex items-center ">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPass ? 'text' : 'password'} name="login_input_password" id="login_input_password" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Password' autoComplete="new-password" />
                        <button tabIndex="-1" onClick={toggleShow} className="show_button bg-gray-200 py-1 px-2 rounded-md">{showPass ? 'Hide' : 'Show'}</button>
                    </div>
                </div>
                {/* input button for login */}
                <div className="button_box flex flex-col justify-center py-4 items-center gap-4">
                    <button
                        onClick={handleLogin}
                        className='bg-blue-600 w-full py-[5px] rounded opacity-90 text-white text-xl hover:bg-blue-700 text-opacity-90 ' >
                        {/* button content is changing to circular progress when clicked to login */}
                        {loading ?
                            (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress color="inherit" size={28} />
                            </Box>
                            ) : ('Login')}
                    </button>
                </div>
            </form>


            {/* the toastify alert is added here */}
            <ToastContainer />

        </>
    )
}

export default Login
