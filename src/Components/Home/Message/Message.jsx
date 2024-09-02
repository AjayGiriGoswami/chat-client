import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const {authUser,selectedUser} = useSelector(store=>store.user)
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div>
      <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full ">
            <img
              alt="ProfilePhoto"
              src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
            />
          </div>
        </div>
        <div className="chat-header"></div>
        <div className={`chat-bubble 'bg-gray-200 text-black'`}>
          {message?.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
