import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Setmessages } from "../../Redux/useMessageSlice";

const useGetMessage = () => {
  const dispatch = useDispatch()
  const { selectedUser } = useSelector((store) => store.user);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8000/api/v1/messages/${selectedUser?._id}`
        );
        dispatch(Setmessages(res.data))
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]); // <--- Add selectedUser to the dependency array
};

export default useGetMessage;
