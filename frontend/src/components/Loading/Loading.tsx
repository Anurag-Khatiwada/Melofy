import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#212121]">
      {/* <span className="loading loading-ring loading-xs"></span>
      <span className="loading loading-ring loading-sm"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-lg"></span>
      <span className="loading loading-ring loading-xl"></span> */}
        <div className="w-16 h-16 border-4 border-green-500 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
