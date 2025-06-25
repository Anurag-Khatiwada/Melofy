

// import { useEffect, useRef, useState } from "react";
// import { useSongData } from "../../context/songContext";
// import {GrChapterNext, GrChapterPrevious} from "react-icons/gr"
// import { FaPause, FaPlay } from "react-icons/fa";

// const Player = () => {
//   const {
//     song,
//     fetchSingleSong,
//     selectedSong,
//     isPlaying,
//     setIsPlaying,
//     nextSong,
//     prevSong,
//   } = useSongData();

//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   const [volume, setVolume] = useState<number>(1);
//   const [progress, setProgress] = useState<number>(0);

//   const [duration, setDuration] = useState<number>(0);

//   useEffect(()=>{
//     const audio = audioRef.current

//     if(!audio) return 

//     const handleLoadedMetaData = ()=>{
//       setDuration(audio.duration || 0);;
      
//     }

//     const handleTimeUpdate = ()=>{
//       setProgress(audio.currentTime || 0)
//     }

//     audio.addEventListener("loadedmetadata", handleLoadedMetaData)
//     audio.addEventListener("timeupdate", handleTimeUpdate)

//     return ()=>{
//       audio.removeEventListener("loadedmetadata", handleLoadedMetaData)
//       audio.removeEventListener("timeupdate", handleTimeUpdate)
//     }
//   },[song])

//   const handlePlayPause =()=>{
//     if(audioRef.current){
//       if(isPlaying){
//         audioRef.current.pause()
//       }else{
//         audioRef.current.play()
//       }
//       setIsPlaying(!isPlaying)
//     }
//   }

//   const volumeChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
//     const newVolume = parseFloat(e.target.value)/100
//         setVolume(newVolume)
//     if(audioRef.current){
//       audioRef.current.volume = newVolume
//     }
//   }

//   const durationChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
//     const newTime = (parseFloat(e.target.value)/100 *duration);

//     if(audioRef.current){
//       audioRef.current.currentTime = newTime
//     }
//     setProgress(newTime);


//   }

//   useEffect(() => {
//     if (selectedSong) {
//       fetchSingleSong();
//     }
//   }, [selectedSong]);

//   return (
//     <div>
//       {song ? (
//         <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
//           <div className="lg:flex items-center gap-4">
//             <img src={song.thumbnail} alt="Thumbnail" className="w-12" />
//             <div className="hidden md:block ">
//               <p>{song.title}</p>
//               <p>{song.description.slice(0, 30)}...</p>
//             </div>
//           </div>
//           <div className="flex flex-col items-center gap-1 m-auto ">
//             {song.audio && (
//               <audio ref={audioRef} src={song.audio} autoPlay={isPlaying} />
//             )}

//             <div className="w-full items-center flex font-thin text-green-400">
//               <input type="range" min={"0"} max={"100"} className="progress-bar w-[120px] md:w-[300px]" value={(progress/duration)*100 || 0} onChange={durationChange}/>

//             </div>
//             <div className="flex justify-center items-center gap-4">
//                 <span className="cursor-pointer" onClick={prevSong}>
//                   <GrChapterPrevious/>
//                 </span>

//                 <button className="bg-white text-black rounded-full p-2" onClick={handlePlayPause}>
//                   {isPlaying? <FaPause/>: <FaPlay/> }
//                 </button>

//                 <span className="cursor-pointer" onClick={nextSong}>
//                   <GrChapterNext/>
//                 </span>
//               </div>
              
//           </div>
//           <div className="flex items-center">
//                 <input type="range" className="w-16 md:w-32 min-[0] max-[100]"  step={"0.01"} value={volume*100} onChange={volumeChange} />
//               </div>
//         </div>
//       ) : (
//         <div className="h-[10%] bg-black text-white flex items-center justify-center px-4">
//           Loading song...
//         </div>
//       )}
//     </div>
//   );
// };

// export default Player;


import { useEffect, useRef, useState } from "react";
import { useSongData } from "../../context/songContext";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    nextSong,
    prevSong,
  } = useSongData();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime || 0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const durationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
  };

  useEffect(() => {
    if (selectedSong) {
      fetchSingleSong();
    }
  }, [selectedSong]);

  return (
    <div>
      {song ? (
        <div className="h-[80px] bg-[#F4F6F8] flex items-center justify-between px-6 shadow-lg text-[#212121] select-none">
          {/* Left: Song info */}
          <div className="flex items-center gap-4 w-[25%] min-w-[220px]">
            <img
              src={song.thumbnail}
              alt="Thumbnail"
              className="w-14 h-14 rounded-md shadow-md object-contain"
            />
            <div className="hidden md:block truncate">
              <p className="font-semibold text-lg truncate">{song.title}</p>
              <p className="text-sm text-gray-600 truncate">{song.description.slice(0, 40)}...</p>
            </div>
          </div>

          {/* Center: Controls and progress */}
          <div className="flex flex-col items-center w-[50%] max-w-[600px]">
            {song.audio && (
              <audio ref={audioRef} src={song.audio} autoPlay={isPlaying} />
            )}

            <div className="flex items-center gap-6 mb-1">
              <button
                className="cursor-pointer text-[#66BB6A] hover:text-[#338a34] transition-colors text-2xl"
                onClick={prevSong}
                aria-label="Previous Song"
              >
                <GrChapterPrevious />
              </button>

              <button
                className="bg-[#66BB6A] hover:bg-[#338a34] text-white rounded-full p-3 shadow-md transition-colors"
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <button
                className="cursor-pointer text-[#66BB6A] hover:text-[#338a34] transition-colors text-2xl"
                onClick={nextSong}
                aria-label="Next Song"
              >
                <GrChapterNext />
              </button>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              className="accent-[#66BB6A] w-full"
              value={(progress / duration) * 100 || 0}
              onChange={durationChange}
              aria-label="Progress Bar"
            />
          </div>

          {/* Right: Volume */}
          <div className="w-[15%] min-w-[100px] flex justify-end">
            <input
              type="range"
              className="accent-[#66BB6A] w-24"
              step="0.01"
              min="0"
              max="100"
              value={volume * 100}
              onChange={volumeChange}
              aria-label="Volume"
            />
          </div>
        </div>
      ) : (
        <div className="h-[80px] bg-[#F4F6F8] text-[#212121] flex items-center justify-center px-6 shadow-lg select-none">
          Loading song...
        </div>
      )}
    </div>
  );
};

export default Player;
