import React, { useEffect } from "react";
import Messages from "./Message/Messages";
import SendInput from "./SendInput";
import { useDispatch, useSelector } from "react-redux";
import { SetselectedUser } from "../../Redux/useSlice";

const MessageContainer = () => {
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(SetselectedUser(null));
    };
  }, []);
  return (
    <>
      {selectedUser ? (
        <>
          <div className="md:min-w-[1000px] flex flex-col">
            <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2 ">
              <div className={`avatar online`}>
                <div className="w-12 rounded-full">
                  <img src={selectedUser?.profilePhoto} alt="user-profile" />
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between gap-2">
                  <p>{selectedUser?.fullname}</p>
                </div>
              </div>
            </div>
            <Messages />
            <SendInput />
          </div>
        </>
      ) : (
        <>
          <div className="md:min-w-[1000px] flex flex-col justify-center items-center">
            <h1 className="text-4xl text-black font-bold">
              Wel-Come {authUser?.fullname}
            </h1>
            <h1 className="text-2xl text-black">Let's start conversation</h1>
          </div>
        </>
      )}
    </>
  );
};

export default MessageContainer;
