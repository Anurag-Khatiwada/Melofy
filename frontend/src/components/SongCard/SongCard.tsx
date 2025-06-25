// import React from 'react'
// import { FaBookmark, FaPlay } from 'react-icons/fa'
// import { useUserData } from '../../context/userContext'
// import { useSongData } from '../../context/songContext'

// interface SongCardProps {
//     image: string,
//     name: string,
//     desc: string,
//     id:string
// }


// const SongCard: React.FC<SongCardProps> = ({image, name,desc, id}) => {
//   const {addToPlayList,isAuth} = useUserData()

//   const {setSelectedSong,setIsPlaying}  = useSongData()

//   const saveToPlayListHandler = ()=>{
//     addToPlayList(id)
//   }
//   return (
//     <div className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
//       <div className="relative group">
//         <img src={image} className='mr-1 w-[160px] rounded' alt="/dummy.jpg" />
//         <div className="flex gap-2 ">
//             <button className='absolute bottom-2 right-14 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' onClick={()=>{
//               setSelectedSong(id);
//               setIsPlaying(true)
//             }}> <FaPlay/> </button>
//             {isAuth && <button className='absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' onClick={saveToPlayListHandler}> <FaBookmark/> </button>}       
//         </div>
//       </div>
//       <p className="font-bold mt-2 mb-1">{name}</p>
//       <p className="text-slate-200 text-sm">{desc.slice(0,20)}...</p>
//     </div>
//   )
// }


// export default SongCard


import React from "react";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { useUserData } from "../../context/userContext";
import { useSongData } from "../../context/songContext";

interface SongCardProps {
  image: string;
  name: string;
  desc: string;
  id: string;
}

const SongCard: React.FC<SongCardProps> = ({ image, name, desc, id }) => {
  const { addToPlayList, isAuth } = useUserData();
  const { setSelectedSong, setIsPlaying } = useSongData();

  const saveToPlayListHandler = () => {
    addToPlayList(id);
  };

  return (
    <div
      className="min-w-[180px] p-3 rounded-lg cursor-pointer hover:bg-[#ffffff26] transition-colors"
      title={`${name} - ${desc}`}
    >
      <div className="relative group">
        <img
          src={image}
          alt={name}
          className="w-[160px] h-[160px] rounded-lg object-cover shadow-md"
          loading="lazy"
        />
        <div className="flex gap-2">
          <button
            aria-label="Play Song"
            className="absolute bottom-3 right-14 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            onClick={() => {
              setSelectedSong(id);
              setIsPlaying(true);
            }}
          >
            <FaPlay />
          </button>
          {isAuth && (
            <button
              aria-label="Add to Playlist"
              className="absolute bottom-3 right-3 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
              onClick={saveToPlayListHandler}
            >
              <FaBookmark />
            </button>
          )}
        </div>
      </div>
      <p className="font-semibold mt-3 mb-1 truncate" title={name}>
        {name}
      </p>
      <p className="text-slate-400 text-sm truncate" title={desc}>
        {desc.length > 20 ? desc.slice(0, 20) + "..." : desc}
      </p>
    </div>
  );
};

export default SongCard;
