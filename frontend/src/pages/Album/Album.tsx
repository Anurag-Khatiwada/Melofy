// import { useParams } from "react-router-dom"
// import Layout from "../../components/Layouts/Layout"
// import { useSongData } from "../../context/songContext"
// import { useEffect } from "react"
// import Loading from "../../components/Loading/Loading"
// import { FaBookmark, FaPlay } from "react-icons/fa"
// import { useUserData } from "../../context/userContext"

// const Album = () => {
//     const {fetchAlbumSongs, albumSong, albumData, setIsPlaying,setSelectedSong, loading} = useSongData() 
//     const params = useParams<{id:string}>()
//     const {isAuth, addToPlayList} = useUserData()
//     useEffect(()=>{
//         if(params.id){

//             fetchAlbumSongs(params.id)
//         }
//     },[params.id])
//     return (
//         <div>
//     <Layout>
//         {albumData && (
//             <>
//                 {
//                     loading? <Loading/> 
//                     :<>
//                         <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
//                             {
//                                 albumData.thumbnail && (
//                                     <img src={albumData.thumbnail} className="w-48 rounded" alt="" />
//                                 )
//                             }
//                             <div className="flex flex-col ">
//                                 <p>Playlist</p>
//                                 <h2 className="text-3xl font-bold mb-4 md:text-5xl">
//                                     {albumData.title} PlayList
//                                 </h2>
//                                 <h4>{albumData.description}</h4>
//                                 <p className="mt-1">
//                                     <img src="/logo.png" className="inline-block w-24" alt="" />
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
//                             <p>
//                                 <b className="mr4">#</b>
//                             </p>
//                             <p className="hidden sm:block">Description</p>
//                             <p className="text-center">Actions</p>
//                         </div>

//                         <hr />
//                         {
//                             albumSong && albumSong.map((song,index)=>{
//                                 return <div className="cursor-pointer grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b]" key={index}>
//                                     <p className="text-white">
//                                         <b className="mr-4 text-[#a7a7a7]">{index+1}</b>
//                                         <img className="inline w-10 mr-5" src={song.thumbnail? song.thumbnail : "/dummy.jpg"} alt="" />
//                                         {song.title}
//                                     </p>
//                                     <p className="text-[15px] hidden sm:block">{song.description.slice(0,30)}...</p>
//                                     <p className="flex justify-center items-center gap-5">
//                                         {isAuth && <button className="text-[15px] text-center" onClick={()=>addToPlayList(song.id)}><FaBookmark/></button>}
//                                         <button className="text-[15px] text-center" onClick={()=>{
//                                             setSelectedSong(song.id);
//                                             setIsPlaying(true)
//                                         }}><FaPlay/></button>

//                                     </p>
//                                 </div>
//                             })
//                         }
//                     </>
//                 }
//             </>
//         )}
//     </Layout>
//     </div>
//   )
// }

// export default Album

import { useParams } from "react-router-dom"
import Layout from "../../components/Layouts/Layout"
import { useSongData } from "../../context/songContext"
import { useEffect } from "react"
import Loading from "../../components/Loading/Loading"
import { FaBookmark, FaPlay } from "react-icons/fa"
import { useUserData } from "../../context/userContext"

const Album = () => {
  const {
    fetchAlbumSongs,
    albumSong,
    albumData,
    setIsPlaying,
    setSelectedSong,
    loading,
  } = useSongData()
  const params = useParams<{ id: string }>()
  const { isAuth, addToPlayList } = useUserData()

  useEffect(() => {
    if (params.id) {
      fetchAlbumSongs(params.id)
    }
  }, [params.id])

  return (
    <div className="bg-[#212121] min-h-screen text-gray-500">
      <Layout>
        {albumData && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="mt-10 flex flex-col md:flex-row md:items-center gap-8 px-4 md:px-0">
                  {albumData.thumbnail && (
                    <img
                      src={albumData.thumbnail}
                      alt={`${albumData.title} thumbnail`}
                      className="w-48 rounded shadow-md"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <div className="flex flex-col">
                    <p className="uppercase tracking-wide text-sm text-[#66BB6A] font-semibold">
                      Playlist
                    </p>
                    <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                      {albumData.title} PlayList
                    </h2>
                    <h4 className="text-[#a7a7a7] max-w-xl">{albumData.description}</h4>
                    <p className="mt-2">
                      <img
                        src="/logo.png"
                        alt="Logo"
                        className="inline-block w-24"
                      />
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-4 text-gray-500 uppercase text-xs tracking-wide select-none">
                  <p>
                    <b className="mr-4">#</b>
                  </p>
                  <p className="hidden sm:block">Description</p>
                  <p className="text-center">Actions</p>
                </div>

                <hr className="border-[#333]" />

                {albumSong?.map((song, index) => (
                  <article
                    key={song.id}
                    className="cursor-pointer grid grid-cols-3 sm:grid-cols-4 mt-6 mb-4 pl-4 rounded-lg transition-colors duration-200 items-center
                               hover:bg-[#a5e0e2]"
                    role="listitem"
                    onClick={() => {
                      setSelectedSong(song.id)
                      setIsPlaying(true)
                    }}
                  >
                    <div className="flex items-center truncate">
                      <b className="mr-4 text-[#a7a7a7] w-6 text-right select-text">
                        {index + 1}
                      </b>
                      <img
                        src={song.thumbnail || "/dummy.jpg"}
                        alt={`${song.title} thumbnail`}
                        className="inline w-10 mr-5 rounded-md object-cover"
                        loading="lazy"
                      />
                      <span
                        className="truncate max-w-[180px] sm:max-w-full font-semibold text-gray-600"
                        title={song.title}
                      >
                        {song.title}
                      </span>
                    </div>

                    <p
                      className="text-[15px] hidden sm:block truncate max-w-[300px] text-gray-600 select-text"
                      title={song.description}
                    >
                      {song.description.length > 30
                        ? song.description.slice(0, 30) + "..."
                        : song.description}
                    </p>

                    <div className="flex justify-center items-center gap-6">
                      {isAuth && (
                        <button
                          className="text-green-500 hover:text-green-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToPlayList(song.id)
                          }}
                          title="Add to Playlist"
                          aria-label={`Add ${song.title} to playlist`}
                        >
                          <FaBookmark size={18} />
                        </button>
                      )}
                      <button
                        className="text-green-500 hover:text-green-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedSong(song.id)
                          setIsPlaying(true)
                        }}
                        title="Play"
                        aria-label={`Play ${song.title}`}
                      >
                        <FaPlay size={18} />
                      </button>
                    </div>
                  </article>
                ))}
              </>
            )}
          </>
        )}
      </Layout>
    </div>
  )
}

export default Album
;
