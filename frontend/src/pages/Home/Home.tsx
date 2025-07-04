// import React from "react";
// import Layout from "../../components/Layouts/Layout";
// import { useSongData } from "../../context/songContext";
// import AlbumCard from "../../components/AlbumCard/AlbumCard";
// import SongCard from "../../components/SongCard/SongCard";
// import Loading from "../../components/Loading/Loading";

// const Home = () => {
//   const { albums, songs, loading } = useSongData();
//   return (
//     <div>
//       {loading? <Loading/> :<Layout>
//         <div className="mb-4 ">
//           <h1 className="my-5 font-bold text-2xl ">Featured Charts</h1>
//           <div className="flex overflow-auto">
//             {albums && albums.length > 0 ? (
//               albums.map((album) => (
//                 <AlbumCard
//                   key={album.id}
//                   image={album.thumbnail}
//                   name={album.title}
//                   desc={album.description}
//                   id={album.id}
//                 />
//               ))
//             ) : (
//               <p>No albums found.</p>
//             )}
//           </div>
//         </div>

//         <div className="mb-4 ">
//           <h1 className="my-5 font-bold text-2xl ">Today's biggest hit</h1>
//           <div className="flex overflow-auto">
//             {songs?.map((e, i) => {
//               return (
//                 <SongCard
//                   key={i}
//                   image={e.thumbnail}
//                   name={e.title}
//                   desc={e.description}
//                   id={e.id}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </Layout>}
//     </div>
//   );
// };

// export default Home;

import React from "react"
import Layout from "../../components/Layouts/Layout"
import { useSongData } from "../../context/songContext"
import AlbumCard from "../../components/AlbumCard/AlbumCard"
import SongCard from "../../components/SongCard/SongCard"
import Loading from "../../components/Loading/Loading"

const Home = () => {
  const { albums, songs, loading } = useSongData()

  return (
    <div className="bg-[#F4F6F8] min-h-screen text-[#212121]">
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <section className="mb-8 px-4 md:px-0">
            <h1 className="my-5 font-bold text-3xl text-[#66BB6A]">Featured Charts</h1>
            <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#66BB6A]/70 scrollbar-track-transparent">
              {albums && albums.length > 0 ? (
                albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    image={album.thumbnail}
                    name={album.title}
                    desc={album.description}
                    id={album.id}
                  />
                ))
              ) : (
                <p className="text-[#757575]">No albums found.</p>
              )}
            </div>
          </section>

          <section className="mb-8 px-4 md:px-0">
            <h1 className="my-5 font-bold text-3xl text-[#66BB6A]">Today's Biggest Hit</h1>
            <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#66BB6A]/70 scrollbar-track-transparent">
              {songs && songs.length > 0 ? (
                songs.map((e, i) => (
                  <SongCard
                    key={i}
                    image={e.thumbnail}
                    name={e.title}
                    desc={e.description}
                    id={e.id}
                  />
                ))
              ) : (
                <p className="text-[#757575]">No songs found.</p>
              )}
            </div>
          </section>
        </Layout>
      )}
    </div>
  )
}

export default Home

