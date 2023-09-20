import React, { useState } from 'react'
// used react-material components 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LockOpenIcon from '@mui/icons-material/LockOpen';
// My pages or componenets
import Login from '../Components/Login';
import Signup from '../Components/SignUp';
import '../CSS/Style.css';


const HomePage = () => {

    // Show login and create user when user toggle
    const [toggleMode, setToggleMode] = useState(true);

    //PreDefine Material-UI Component code to changing tabs of login and create user
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            {/* <Navbar/> */}

            <div className="login_container font-signika flex flex-col justify-center items-center pt-7 gap-4  ">

                {/* this includes heading part */}
                <div className="login_heading bg-white rounded-md w-[35rem]  py-3 flex justify-center items-center ">
                    <h1 className=' text-3xl font-semibold  opacity-80 tracking-wide' >Your-Login-Page</h1>
                </div>


                {/*  this includes login content part */}
                <div className="login_contenet bg-white rounded-sm  w-[35rem]  py-3 flex justify-center items-center flex-col ">
                    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                        <Tab icon={<LockOpenIcon />} label="LOGIN-ACCOUNT"
                            onClick={() => setToggleMode(true)}
                        />
                        <Tab icon={<PersonPinIcon />} label="CREATE-ACCOUNT"
                            onClick={() => setToggleMode(false)}
                        />
                    </Tabs>


                    {/*👉 LOGIN FOROM of login user */}
                    {
                        toggleMode && <Login /> // if true then login mode
                    }
                    {/*👉 CREATE ACCOUNT FOROM */}
                    {
                        (!toggleMode) && <Signup /> // if false then signup mode
                    }

                </div>
            </div>

        </>
    )
}

export default HomePage
