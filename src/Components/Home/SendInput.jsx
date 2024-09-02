import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Setmessages } from "../../Redux/useMessageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const OnsubmitedHander = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/messages/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(Setmessages([...messages, res.data.newMessage]))
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setMessage("")
  };
  return (
    <>
      <form className="px-4 my-3" onSubmit={OnsubmitedHander}>
        <div className="w-full relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
          />
          <button
            type="submit"
            className="absolute flex inset-y-0 end-0 items-center pr-4"
          >
            <IoSend />
          </button>
        </div>
      </form>
    </>
  );
};

export default SendInput;
