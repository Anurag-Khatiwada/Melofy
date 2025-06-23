import Layout from "../../components/Layouts/Layout";
import React, { useEffect,useState } from "react";
import { useUserData } from "../../context/userContext";
import { useSongData } from "../../context/songContext"
import Loading from "../../components/Loading/Loading";
import { FaBookmark, FaPlay } from "react-icons/fa"

const Playlist = () => {
    const {user,addToPlayList} = useUserData()
    const {songs, setIsPlaying,setSelectedSong, loading} = useSongData() 
  const [myPlaylist, setMyPlaylist] = useState<Songs[]>([])
 
  useEffect(()=>{
    if(songs && user?.playlist){
        const filteredSongs = songs.filter((song)=>user.playlist.includes(song.id.toString()))
        setMyPlaylist(filteredSongs)

    }
  },[songs,user])
    return (
    <div>
      <Layout>
        {myPlaylist && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                  
                    <img
                      src={"./melofyPlaylist.png"}
                      className="w-48 rounded"
                      alt=""
                    />
                  
                  <div className="flex flex-col ">
                    <p>Playlist</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                      {user?.name} PlayList
                    </h2>
                    <h4>Your favourite songs</h4>
                    <p className="mt-1">
                      <img
                        src="/logo.png"
                        className="inline-block w-24"
                        alt=""
                      />
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                  <p>
                    <b className="mr4">#</b>
                  </p>
                  <p className="hidden sm:block">Description</p>
                  <p className="text-center">Actions</p>
                </div>

                <hr />
                {myPlaylist &&
                  myPlaylist.map((song, index) => {
                    return (
                      <div
                        className="cursor-pointer grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b]"
                        key={index}
                      >
                        <p className="text-white">
                          <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                          <img
                            className="inline w-10 mr-5"
                            src={song.thumbnail ? song.thumbnail : "/dummy.jpg"}
                            alt=""
                          />
                          {song.title}
                        </p>
                        <p className="text-[15px] hidden sm:block">
                          {song.description.slice(0, 30)}...
                        </p>
                        <p className="flex justify-center items-center gap-5">
                          
                            <button
                              className="text-[15px] text-center"
                              onClick={() => addToPlayList(song.id)}
                            >
                              <FaBookmark />
                            </button>
                          
                          <button
                            className="text-[15px] text-center"
                            onClick={() => {
                              setSelectedSong(song.id);
                              setIsPlaying(true);
                            }}
                          >
                            <FaPlay />
                          </button>
                        </p>
                      </div>
                    );
                  })}
              </>
            )}
          </>
        )}
      </Layout>
    </div>
  );
};

export default Playlist;
