import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

const DocsPageBox = (props) => {

    // getting all props
    const { heading, description, pagePic, index, deleteBox } = props;



    return (
        <>
            {/* indivisual box is repeated */}
            <div className="page_info_box flex w-full flex-wrap justify-center py-2 gap-2 items-center ">
                {/* page image */}
                <div className="page_image flex-3  border-[1px]  border-gray-500">
                    <img className='w-96 h-64 ' src={pagePic} alt="" srcSet="" />
                </div>
                <div className="page_description flex-all lg:max-h-[16rem] md:max-h-fit sm:max-h-fit rounded  border-[1px]  border-gray-500">
                    <div className="heading w-full flex justify-between items-center px-3">
                        <h3 className='text-white text-center bg-slate-800 text-xl py-[0.2rem]' >{index+1}. {heading}</h3>
                        <div className="operations flex items-center justify-between gap-3">

                            <Tooltip title="Edit" arrow >
                                <EditIcon
                                    className='custom-transition bg-gray-300 rounded m-1 text-black hover:text-gray-600 cursor-pointer' />
                            </Tooltip>
                            <Tooltip title="Delete" arrow >
                                <DeleteForeverIcon
                                    onClick={() => deleteBox(index)}
                                    className='custom-transition bg-gray-300 rounded m-1 text-red-500 hover:text-red-400 cursor-pointer' />
                            </Tooltip>
                        </div>

                    </div>
                    <textarea
                        className="docs_textarea_box min-w-[35rem] p-3  overflow-x-auto text-lg bg-gray-700 text-gray-200 font-normal rounded w-fit h-fit  focus:outline-none placeholder: Your Bio"
                        name="" id="description" cols="30" rows="10"
                        value={description}
                        readOnly={true}
                        >
                    </textarea>
                </div>
            </div>
        </>
    )
}

export default DocsPageBox
