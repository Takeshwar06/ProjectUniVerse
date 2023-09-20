import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

// Define a functional component called CustomSelection that takes props as input
const CustomSelection = ({ listValues, values, setValues }) => {
    // State to manage the input value
    const [inputValue, setInputValue] = useState("");

    // State to control whether the list is shown or hidden
    const [showList, setShowList] = useState(false);

    // Function to toggle the list visibility
    const toggleList = () => {
        setShowList(!showList);
    }

    // Function to close the list and log the selected item
    const handleChooseList = (e) => {
        setShowList(false);
        // setValues(e.target.innerHTML);
        let latestValue = e.target.innerHTML;
        if (!values.includes(latestValue))
            setValues([...values, latestValue]);
    }

    // Render the component
    return (
        <>
            <div className="selection_container font-signika flex flex-col h-full w-36">
                <div
                    className="input_box w-full bg-white border-[1px] flex justify-between items-center px-1 border-gray-400 overflow-hidden">
                    {/* Input field for searching */}
                    <input
                        onClick={toggleList}
                        onChange={(e) => setInputValue(e.target.value)}
                        className='focus:outline-none w-[70%] px-1 text-lg border-none text-black'
                        type="text"
                        id="input_value"
                        placeholder=" Search"
                    />

                    {/* Change arrow icon when clicked and after clicked */}
                    <SearchIcon className='cursor-pointer text-black' />
                </div>

                {/* List of values */}
                <ul className={`list_box max-w-full bg-white ${showList ? 'block' : 'hidden'} max-h-[120px] overflow-y-auto`}>
                    {
                        // Filter and map the listValues based on the input value
                        listValues
                            .filter((element) => element.toLowerCase().includes(inputValue.toLowerCase()))
                            .map((filteredElement, index) => (
                                <li
                                    key={index}
                                    onClick={handleChooseList}
                                    className="list flex justify-center items-center w-full h-fit text-black text-[1rem] cursor-pointer list-none hover:bg-slate-400">
                                    {filteredElement}
                                </li>
                            ))
                    }
                </ul>
            </div>
        </>
    )
}

export default CustomSelection;
