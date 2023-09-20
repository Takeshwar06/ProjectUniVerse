import React from 'react'

const ChatMessages = ({ chatMessages }) => {
    return (
        <>

            {/* particular message box */}
            {
                chatMessages.flatMap((day,dayIndex) => {
                    return (
                        <React.Fragment key={dayIndex}>
                            {/* show first date */}
                            <div className="date_show flex items-center justify-center py-3">
                                <div className="date bg-slate-600 px-2 py-[1px] rounded-md">
                                    <p>{day.date}</p>
                                </div>
                            </div>

                            {/* for messages */}

                            {
                                day.messages.map((message, index) => (

                                    <div key={index} className={`message_box_right w-full flex ${message.sender === 'user' ? 'justify-end' : ''} my-2`}>
                                        <div className={`message bg-green-800 px-2 py-[1px] w-fit max-w-[60%] rounded-md rounded-${message.sender === 'user' ? 'tr' : 'tl'}-none`}>
                                            <p className='message_name text-[1.2rem]'>
                                                {message.message}
                                            </p>
                                        </div>
                                    </div>

                                ))}
                        </React.Fragment>
                    )
                })
            }




            {/* right sender messae */}
            {/* left messae receiver messae */}
            {/* <div className="message_box_right w-full flex justify-end my-2">
                <div className="message bg-green-800 px-2 py-[1px] w-fit max-w-[60%] rounded-md rounded-tr-none">
                    <p className='message_name' >
                    I am sender
                    </p>
                </div>
            </div>

            <div className="message_box_left w-full flex my-2">
                <div className="message bg-green-800 px-2 py-[1px] w-fit max-w-[60%] rounded-md rounded-tl-none">
                    <p className='message_name' >
                    I am receiver
                    </p>
                </div>
            </div> */}



        </>
    )
}

export default ChatMessages
