import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import AddCardIcon from '@mui/icons-material/AddCard';
import DocsPageBox from '../Components/ProjectComponents/DocsPageBox';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
// circular progress
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const DocsPage = () => {

  // show editing box
  const [showEditBox, setShowEditBox] = useState(false);

  // loader state which load when upload image
  const [loading, setLoading] = useState(false);

  // getting heading of page
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [pagePic, setPagePic] = useState("");


  // store all box which is add new by user
  const [pageBox, setPageBox] = useState([
    {
      heading: "First Page is Landing Page",
      description: "My landing page is one of the beautifull page of my website this page is used html css js with talwind css with responsive features",
      pagePic: "https://res.cloudinary.com/hackethon-users-image/image/upload/v1694462157/dpvozdxoa6iacw2a7n73.jpg"
    }
  ]);

  // handle when uploaded image page
  const handleTakePageImage = async (e) => {
    setLoading(true);
    try {
      // chhose image of user
      const file = e.target.files[0];
      // make formData to post request in cloudinary which give live url string
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "chat-app");
      formData.append("cloud_name", "hackethon-users-image");

      // desctructured data is giving all details about uploaded image
      const { data } = await axios.post("https://api.cloudinary.com/v1_1/hackethon-users-image/image/upload"
        , formData) // send payLoad
      console.log(data);
      console.log(data.url);
      setPagePic(data.url.toString());
      setLoading(false);
      toast.success("image uploaded!");
      return;

    }
    catch (error) {
      setLoading(false);
      toast.error("Error during upload image");
      return;
    }
  }



  // when clicking in add new then add new box
  const addPageBox = () => {
    // first check if any input is empty
    if (!heading || !description || !pagePic) {
      toast.warn("Please fill all inputs");
      return;
    }
    else {
      setPageBox([...pageBox, { heading: heading, description: description, pagePic: pagePic }])
      toast.success("Added Successfully!");
    }

  }

  // delete particular box of page box
  const deleteBox = (pageNo) => {
    const newBoxes = pageBox.filter((currElem, index) => {
      return pageNo !== index;
    })
    // set new boxes
    setPageBox(newBoxes);

  }


  return (
    <>

      <div className="docs_container font-signika ">

        <div className="heading_container flex  text-white items-center justify-between px-16 py-3 shadow-sm shadow-gray-500 ">
          <h1 className='profile_container_heading font-signika font-semibold text-gray-300 text-2xl ' >DOCUMENTATION</h1>
          <div className="edit_profile_box flex gap-6 items-center justify-center">

            {/* if user edit then show save and cancel button */}
            {
              !showEditBox ? (
                <button className='edit_button custom-button '
                  onClick={() => { setShowEditBox(true) }}
                >EDIT</button>
              ) : (
                <>
                  <button className='edit_button custom-button '
                  onClick={()=> setShowEditBox(false)}
                  >SAVE</button>
                  <button className='edit_button custom-button '
                  onClick={()=> setShowEditBox(false)}
                  >CANCEL</button>
                </>
              )
            }

          </div>
        </div>


        {/* basic details of project */}
        <div className="project_details text-white flex gap-3 flex-col justify-center items-center py-10 px-2 pb-3  shadow-sm shadow-blue-500">
          {/* name of project container */}
          <div className="project_name_box flex w-full justify-center">
            <h1 className='font-signika  text-gray-100 text-3xl font-semibold opacity-90' >SMART CANTEEN</h1>
          </div>

          {/* description of project container */}
          <div className="project_description_box lg:w-[80%] ">
            <p className='project_description text-center text-xl custom-values' >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nisi atque amet quasi id architecto? Natus commodi adipisci assumenda? Mollitia.
            </p>
          </div>

          {/* technology used */}

          {/* technology which is selected */}
          <div className="selected_technology max-w-[450px] mb-2 flex flex-wrap justify-center items-center gap-1 select-none">
            <h2 className='text-xl' >Techology Used : </h2>
            <div className="technology_box flex flex-wrap items-center gap-1 justify-center ">
              <span className='selected_options px-1 ' >HTML</span>
              <span className='selected_options px-1' >CSS</span>
              <span className='selected_options px-1' >JavaScript</span>
              <span className='selected_options px-1' >REACT</span>
            </div>
          </div>
        </div>



        {/* if need then edit */}
        {/* all descripton of pages of project */}
        <div className="pages_info_containe w-full py-5 pb-16 mb-5 ">
        <h1 className='text-center text-2xl font-semibold text-gray-200 py-1' >Description</h1>

          {
            showEditBox ?
              (
                <>

                  {/* indivisual box is repeated */}
                  <div className="page_info_box flex w-full flex-wrap justify-center py-2 gap-2 items-center ">
                    {/* page image */}
                    <div className="page_image flex-3  border-[1px] flex-col  border-gray-500 cursor-pointer">
                      <img className='w-96 h-64 ' src={`${pagePic ? pagePic : './Images/sample_page.jpg'}`} alt="" srcSet="" />
                      <label className='absolute cursor-pointer h-64 w-96 flex text-gray-500 text-xl font-bree  hover:text-gray-600  custom-transition   justify-center items-center' htmlFor="docs_page_image">
                        {/* if pic is not stored then do and uploaded then do */}
                        {
                          !pagePic && !loading ? (
                            <>
                              <AddPhotoAlternateIcon />
                              Choose File
                            </>
                          ) : ""
                        }

                        {loading ?
                          (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress color="inherit" size={28} />
                          </Box>
                          ) : (
                            <>
                            </>
                          )}

                      </label>
                      <input
                        onChange={handleTakePageImage}
                        className='hidden ' type="file" name="" accept=".jpeg, .jpg, .png" id="docs_page_image" />
                    </div>
                    <div className="page_description flex flex-col max-h-[16rem]  gap-1">
                      <input
                        onChange={(e) => setHeading(e.target.value)}
                        type="text" className='text-white pl-3 bg-slate-800 text-xl py-[0.2rem] ' placeholder='Enter Heading' />
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        className="docs_textarea_form min-w-[35rem] p-3  overflow-x-auto text-lg bg-gray-700 text-gray-200 font-normal rounded focus:border-slate-600 " placeholder="Enter Page Description"
                        name="" id="" cols="30" rows="10"></textarea>
                    </div>
                  </div>


                  <div className="add_buttons flex justify-end items-center relative w-[85vw] py-2 pb-10">
                    <button
                      onClick={addPageBox}
                      className="add_new_page_info  text-white flex items-center justify-center fav_button min-w-[123px]"
                    >
                      <AddCardIcon />&nbsp;  <span>Add New</span>
                    </button>
                  </div>

                </>
              ) : ""
          }




          {/* show all boxes when added */}
          {
            pageBox.map((element, index) => {
              return (
                <DocsPageBox key={index}
                  heading={element.heading}
                  description={element.description}
                  pagePic={element.pagePic}
                  index={index}
                  deleteBox={deleteBox}
                />
              )
            })
          }





        </div>
      </div>


      {/* popup container */}
      <ToastContainer />
    </>
  )
}

export default DocsPage
