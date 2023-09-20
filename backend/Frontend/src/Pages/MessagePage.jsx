import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Components/Navbar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';
import ChatMessages from '../Components/ProjectComponents/ChatMessages';
import { previousTempMessages } from './tempMessage';

const MessagePage = () => {

    const data = new Date();

    // chat show or not
    const [showChat, setShowChat] = useState(false);

    // always open keyboard for typing
    const inputRef = useRef(null);

    // Using state to set innerWidth of Windows
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // state which input typed by user
    const [messageInput, setMessageInput] = useState("");

    const messagesContainerRef = useRef(null); // Create a ref for the messages container



    // store all messages of user
    const tempMessages = [
        ...previousTempMessages,

        {
            date: new Date().toLocaleDateString(),
            messages: [
                {
                    sender: 'user',
                    message: 'Hii Bro Good Morning!',
                    time: '1'
                },
                {
                    sender: 'friend',
                    message: 'Hii Bro Good Morning!',
                    time: '2'
                },
                {
                    sender: 'user',
                    message: 'What are you doing!',
                    time: '3'
                },
                {
                    sender: 'friend',
                    message: 'I am making backend api from whole night!',
                    time: '4'
                },
            ]
        }
    ]

    // all chat messages stored here
    const [chatMessages, setChatMessages] = useState(tempMessages);


    useEffect(() => {
        // Use useEffect to scroll to the bottom when chatMessages change and showChat is true
        if (messagesContainerRef.current && showChat) {
            // Scroll to the bottom of the messages container
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            console.log(windowWidth); // Log the updated windowWidth value
        };

        // Add an event listener to listen for window resize
        window.addEventListener("resize", handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [chatMessages, showChat]); // Include chatMessages and showChat as dependencies


    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            // Scroll to the bottom of the messages container
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };


    // if clcked to enter then go send
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }

    // Send message to friend
    const sendMessage = () => {
        if (messageInput.trim() === "") {
            toast.warn("Please Enter input!");
            return; // Exit early if input is empty
        }

        const currentMessage = {
            sender: 'user',
            message: messageInput,
            time: new Date().toISOString(), // Use a unique timestamp
        }

        const currDate = new Date().toLocaleDateString();
        const todayMessageIndex = chatMessages.findIndex(message => message.date === currDate);

        if (todayMessageIndex !== -1) {
            // Create a copy of chatMessages to update the state
            const updatedChatMessages = [...chatMessages];
            updatedChatMessages[todayMessageIndex].messages.push(currentMessage);

            // Update the state to trigger a re-render
            setChatMessages(updatedChatMessages);
        }

        // Clear the message input after sending
        setMessageInput(' ');
        inputRef.current.focus();
    }



    return (
        <>
            <div className="communication_message_container text-white font-signika flex items-center justify-center w-full  min-h-full ">


                {/* not show when showing chatsContent */}

                {
                    !showChat && (
                        <>

                            {/* contact message list  */}
                            <div className="all_person_list flex flex-col  min-h-[90vh] min-w-[25rem] max-w-[50rem] px-3 gap-1 border-[1px] border-blue-900 rounded-md" >
                                {/* three filters connect group */}
                                <div className="person_filters flex justify-center gap-3 items-center py-2 h-16">
                                    <button className='fav_button ' >All</button>
                                    <button className='fav_button ' >Connect</button>
                                    <button className='fav_button ' >Group</button>
                                </div>
                                {/* list of persons */}

                                <div
                                    className="person_list flex flex-col gap-2 px-1 py-1 bg-slate-800 h-full ">

                                    {/* card of particular person */}
                                    <div
                                        onClick={() => { if (windowWidth <= 821) { setShowChat(true); scrollToBottom(); } }}
                                        className="person_details cursor-pointer rounded hover:bg-slate-500 flex custom-transition justify-between h-14 bg-slate-600 px-5 items-center">
                                        <div className="person_box flex gap-3  py-1 items-center">
                                            <img className='h-10 w-10 rounded-full' src="./Images/dushyant.jpg" alt="lokeshwar" />
                                            <h3 className='text-lg opacity-90' >Dushyant Das</h3>
                                        </div>
                                        <span className='opacity-85' >12/09/23</span>
                                    </div>

                                    {/* card of particular person */}
                                    <div
                                        onClick={() => { if (windowWidth <= 821) { setShowChat(true); scrollToBottom(); } }}
                                        className="person_details cursor-pointer rounded hover:bg-slate-500 flex custom-transition justify-between  h-14  bg-slate-600 px-5 items-center">
                                        <div className="person_box flex gap-3  py-1 items-center">
                                            <img className='h-10 w-10 rounded-full' src="./Images/khilendra.jpg" alt="lokeshwar" />
                                            <h3 className='text-lg opacity-90' >Khilendra Kumar</h3>
                                        </div>
                                        <span className='opacity-85' >Yesterday</span>
                                    </div>

                                    {/* card of particular person */}
                                    <div
                                        onClick={() => { if (windowWidth <= 821) { setShowChat(true) } }}
                                        className="person_details cursor-pointer rounded hover:bg-slate-500 flex custom-transition justify-between  h-14  bg-slate-600 px-5 items-center">
                                        <div className="person_box flex gap-3  py-1 items-center">
                                            <img className='h-10 w-10 rounded-full' src="./Images/takeshwar.jpg" alt="lokeshwar" />
                                            <h3 className='text-lg opacity-90' >Takeshwar Janghel</h3>
                                        </div>
                                        <span className='opacity-85' >Today</span>
                                    </div>

                                </div>
                            </div>
                        </>
                    )
                }


                {/* mesage person and all messages */}
                {
                    ((windowWidth >= 821) || (windowWidth <= 821 && showChat)) &&
                    <div
                        className="messages_container flex flex-col  min-h-[90vh] justify-between min-w-[60vw] border-r-[1px] border-t-[1px] border-b-[1px] border-blue-900 rounded-md">
                        {/* receiver details */}
                        <div className="receiver_box flex items-center justify-between h-14  py-2 ">
                            <div className="receiver_details flex items-center gap-2  px-3">
                                <img className='h-11 w-11 rounded-full cursor-pointer' src="./Images/takeshwar.jpg" alt="" srcSet="" />
                                <div className="person_online flex flex-col justify-center ">
                                    <h3>Takeshwar Janghel</h3>
                                    <span className='text-sm' >Online</span>
                                </div>
                            </div>
                            <MoreVertIcon className="cursor-pointer hover:bg-slate-500 custom-transition  rounded-full" />
                        </div>
                        {/* messages adn send message box */}
                        <div className=' h-full bg-slate-800 overflow-y-auto  p-2 flex flex-col justify-between gap-3' >
                            <div ref={messagesContainerRef} className="messagesb_box_container overflow-x-auto max-h-[73vh]">

                                <ChatMessages chatMessages={chatMessages} />

                            </div>
                            <div className="send_message_container flex justify-between items-center gap-1 my-1 bg-slate-800">
                                <input
                                    ref={inputRef}
                                    onKeyDown={handleKeyDown}
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    className='w-full bg-slate-700 border-gray-500 px-2 py-1 border-[1px] rounded  focus:outline-none' type="text" name="" id="input_message " placeholder='Enter Message' />
                                {/* when enter then go send message */}

                                <SendIcon
                                    onClick={sendMessage}
                                    style={{ fontSize: '2.1rem' }} className='text-green-400 hover:bg-slate-500 rounded hover:text-green-200 custom-transition cursor-pointer p-[1px] px-1' />
                            </div>
                        </div>
                    </div>
                }
            </div>



            <ToastContainer />


        </>
    )
}

export default MessagePage
