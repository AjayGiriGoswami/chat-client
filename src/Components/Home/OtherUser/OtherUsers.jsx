import React from "react";
import OtherUser from "./OtherUser";
import { useSelector } from "react-redux";
import useGetOtherUser from "../../Hooks/useGetOtherUser";

const OtherUsers = () => {
  useGetOtherUser();
  const{ otherUsers} = useSelector((store) => store.user);

  if (!otherUsers) return;
  // if(loading){
  //   return <div>Loading...</div>
  // }

  return (
    <div className="overflow-auto flex-1">
      {otherUsers?.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;