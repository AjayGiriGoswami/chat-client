import React, { useState } from "react";
import OtherUsers from "./OtherUser/OtherUsers";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout, SetotherUsers } from "../../Redux/useSlice";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otherUsers } = useSelector((store) => store.user);
  const HandleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout");
      toast.success(res.data.message);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const HandleSearch = async (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(SetotherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  };
  return (
    <>
      <div className="md:min-w-[350px] border-r border-slate-500 p-4 flex flex-col">
        <form
          onSubmit={HandleSearch}
          action=""
          className="flex items-center gap-2 ons"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input w-100 input-bordered rounded-md "
            // type="text"
            type="search"
            placeholder="Search..."
          />
        </form>
        <div className="divider px-0"></div>
        <div className="overflow-auto flex-1">
          <OtherUsers />
        </div>
        <div className="divider px-0 "></div>
        <div className="mt-0 mb-0">
          <button
            className="btn "
            style={{ border: "2px", borderRadius: "20px", background: "red" }}
            onClick={HandleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
