
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import newRequest from "../utils/newRequest";
import { useUserData } from "./userContext";

export interface Song {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audio: string;
  album_id: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface SongContextType {
  songs: Song[];
  song: Song | null;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  loading: boolean;
  selectedSong: string | null;
  setSelectedSong: (id: string) => void;
  albums: Album[];
  fetchSingleSong: () => Promise<void>;
  nextSong: () => void;
  prevSong: () => void;
  albumSong: Song[];
  albumData: Album | null;
  fetchAlbumSongs: (id:string)=>Promise<void>
  fetchSongs: ()=>Promise<void>
  fetchAlbum:()=>Promise<void>

}

const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
  children: ReactNode;
}

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [song, setSong] = useState<Song | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [albumSong, setAlbumSong] = useState<Song[]>([])
  const [albumData, setAlbumData] = useState<Album | null>(null)

  const {isAuth} = useUserData()
  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await newRequest.get<Song[]>(`/v1/songs/all-songs`);
      setSongs(data);
      if (data.length > 0) {
        setSelectedSong(data[0].id.toString());
        setIndex(0);
        setIsPlaying(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchSingleSong = useCallback(async () => {
    if (!selectedSong) {
      console.warn("fetchSingleSong called but selectedSong is null");
      return;
    }

    try {
      const { data } = await newRequest.get<Song>(`/v1/songs/song/${selectedSong}`);
      setSong(data[0]);
    } catch (err) {
      console.log(err);
    }
  }, [selectedSong]);


  const fetchAlbum = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await newRequest.get<Album[]>(`/v1/songs/all-albums`);
      setAlbums(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlbum();
    fetchSongs();
  }, []);

  const nextSong = useCallback(() => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
      setSelectedSong(songs[newIndex]?.id.toString());
      return newIndex;
    });
  }, [songs]);

  const prevSong = useCallback(() => {
    setIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      setSelectedSong(songs[newIndex]?.id.toString());
      return newIndex;
    });
  }, [songs]);

  const fetchAlbumSongs = useCallback(async(id:string)=>{
    setLoading(true)
    try{
      const {data} = await newRequest.get<{songs: Song[]; album: Album}>(`/v1/songs/songs-from-album/${id}`)
      console.log(data)
      setAlbumData(data.album);
      setAlbumSong(data.songs)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  },[])

  return (
    <SongContext.Provider
      value={{
        songs,
        song,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        loading,
        albums,
        fetchSingleSong,
        nextSong,
        prevSong,
        albumData,
        albumSong,
        fetchAlbumSongs,
        fetchAlbum,
        fetchSongs
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongData = (): SongContextType => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongData must be within a SongProvider");
  }

  return context;
};
