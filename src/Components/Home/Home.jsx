import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";




const Home = () => {
  

  return (
    <>
       <div className='flex sm:h-[550px] md:h-[580px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar />
      <MessageContainer />
    </div>
    </>
  );
};

export default Home;