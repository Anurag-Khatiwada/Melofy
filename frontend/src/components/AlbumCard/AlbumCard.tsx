// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// interface AlbumCardProps {
//     image: string,
//     name: string,
//     desc: string,
//     id:string
// }

// const AlbumCard:React.FC<AlbumCardProps> = ({image, name, desc, id}) => {
//   const navigate = useNavigate()
//     return (
//     <div onClick={()=>navigate(`/album/${id}`)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
//       <img src={image} className='rounded w-[160px] ' alt="" />
//       <p className="font-bold mt-2 mb-1">{name.slice(0,12)}...</p>
//       <p className="text-slate-200 text-sm">{desc.slice(0,18)}...</p>
//     </div>
//   )
// }

// export default AlbumCard


import React from "react";
import { useNavigate } from "react-router-dom";

interface AlbumCardProps {
  image: string;
  name: string;
  desc: string;
  id: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[180px] p-3 rounded-lg cursor-pointer hover:bg-[#ffffff26] transition-colors"
      title={`${name} - ${desc}`}
    >
      <img
        src={image}
        alt={name}
        className="rounded-lg w-[160px] h-[160px] object-cover shadow-md"
        loading="lazy"
      />
      <p className="font-semibold mt-3 mb-1 truncate" title={name}>
        {name.length > 12 ? name.slice(0, 12) + "..." : name}
      </p>
      <p className="text-slate-400 text-sm truncate" title={desc}>
        {desc.length > 18 ? desc.slice(0, 18) + "..." : desc}
      </p>
    </div>
  );
};

export default AlbumCard;
