// 

import { useNavigate } from "react-router-dom";
import PlayListCard from "../Playlist/PlayListCard";
import { useUserData } from "../../context/userContext";
import { FaHome, FaFolder, FaArrowRight, FaPlus } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useUserData();

  return (
    <div className="w-[25%] h-full p-4 flex flex-col gap-4 text-[#212121] bg-[#E3F2FD] hidden lg:flex shadow-md rounded-lg">
      {/* Top Section */}
      <div className="bg-white h-[15%] rounded-lg flex flex-col justify-around shadow-sm">
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer hover:text-[#66BB6A] transition-colors"
          onClick={() => navigate("/")}
        >
          <FaHome className="w-6 h-6" />
          <p className="font-bold">Home</p>
        </div>
      </div>

      {/* Library Section */}
      <div className="bg-white h-[85%] rounded-lg shadow-sm flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FaFolder className="w-8 h-8 text-[#212121]" />
            <p className="font-semibold text-[#212121]">Your Library</p>
          </div>
          <div className="flex items-center gap-3 text-[#66BB6A] cursor-pointer">
            <FaArrowRight className="w-8 h-8" />
            <FaPlus className="w-8 h-8" />
          </div>
        </div>

        <div onClick={() => navigate("/playlist")}>
          <PlayListCard />
        </div>

        <div className="p-4 m-2 bg-[#E3F2FD] rounded font-semibold flex flex-col items-start gap-1 pl-4 mt-4 text-[#212121] shadow-inner">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We'll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-[#66BB6A] text-white text-[15px] rounded-full mt-4 hover:bg-[#4caf50] transition-colors">
            Browse Podcast
          </button>
        </div>

        {user && user.role === "admin" && (
          <button
            className="cursor-pointer ml-8 px-6 py-1.5 bg-[#66BB6A] text-white text-[15px] rounded-full mt-4 hover:bg-[#4caf50] transition-colors w-auto max-w-xs whitespace-nowrap"
            onClick={() => navigate(`/admin`)}
          >
            Admin Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

