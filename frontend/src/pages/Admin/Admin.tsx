// import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
// import {MdDelete} from "react-icons/md"
// import { Link, useNavigate } from "react-router-dom"
// import { useUserData } from "../../context/userContext"
// import { useSongData } from "../../context/songContext"
// import newRequest from "../../utils/newRequest"
// import toast from "react-hot-toast"

// const Admin = () => {
//     const navigate=useNavigate()
//     const {user} = useUserData()

//     const {albums, songs, fetchAlbum,fetchSongs} = useSongData()
   
//     const [title, setTitle] = useState<string>("")
//     const [description, setDescription] = useState<string>("")
//     const [album, setAlbum] = useState<string>("")
//     const [file, setFile] = useState<File | null>(null)
//     const [btnLoading, setBtnLoading] = useState<boolean>(false)
    
//     const addAlbumHandler = async(e:FormEvent)=>{
//         e.preventDefault();
//         if(!file) return 

//         const formData = new FormData();
//         formData.append("title",title);
//         formData.append("description", description)
//         formData.append("file",file)

//         setBtnLoading(true)
//         try{
//             const {data} = await newRequest.post(`/v1/admin/add-album`,formData)
//             toast.success(data.message);
//             fetchAlbum()
//             setBtnLoading(false)
//             setTitle("")
//             setDescription("")
//             setFile(null)
//         }catch(err: any){
//             toast.error(err.response?.data?.message || "An error occured")
//             setBtnLoading(false)
//         }
//     }

//     const addSongHandler = async(e:FormEvent)=>{
//         e.preventDefault();
//         if(!file) return 

//         const formData = new FormData();
//         formData.append("title",title);
//         formData.append("description", description)
//         formData.append("file",file)
//         formData.append("album_id", album)

//         setBtnLoading(true)
//         try{
//             const {data} = await newRequest.post(`/v1/admin/add-song`,formData)
//             toast.success(data.message);
//             fetchSongs()
//             setBtnLoading(false)
//             setTitle("")
//             setDescription("")
//             setFile(null)
//             setAlbum("")
//         }catch(err: any){
//             toast.error(err.response?.data?.message || "An error occured")
//             setBtnLoading(false)
//         }
//     }

//     const addThumbnailHandler = async(id:string)=>{
//         if(!file) return 

//         const formData = new FormData();
//         formData.append("file",file)

//         setBtnLoading(true)
//         try{
//             const {data} = await newRequest.post(`/v1/admin/add-thumbnail/${id}`,formData)
//             toast.success(data.message);
//             fetchSongs()
//             setBtnLoading(false)
//             setFile(null)
//         }catch(err: any){
//             toast.error(err.response?.data?.message || "An error occured")
//             setBtnLoading(false)
//         }
//     }

//     const deleteAlbum = async(id:string)=>{
//         if(confirm("Are you sure you want to delete this album")){
//             setBtnLoading(true)
//             try{
//                 const {data} = await newRequest.delete(`/v1/admin/delete-album/${id}`)
//                 toast.success("Album deleted successfully")
//                 setBtnLoading(false)
//                 fetchAlbum()
//             }catch(err:any){
//                 toast.error(err.response?.data?.message || "An error occured")
//                 setBtnLoading(false)
//             }
//         }
//     }
//     const deleteSong = async(id:string)=>{
//         if(confirm("Are you sure you want to delete this song")){
//             setBtnLoading(true)
//             try{
//                 const {data} = await newRequest.delete(`/v1/admin/delete-song/${id}`)
//                 toast.success("Songg deleted successfully")
//                 setBtnLoading(false)
//                 fetchAlbum()
//             }catch(err:any){
//                 toast.error(err.response?.data?.message || "An error occured")
//                 setBtnLoading(false)
//             }
//         }
//     }
//     useEffect(()=>{
//         if(user && user.role!=="admin"){
//             navigate('/')
//         }
//     },[user,navigate])

//     const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
//         const selectedFile = e.target.files?.[0] || null;
//         setFile(selectedFile)
//     }

//   return (
//     <div className=" min-h-screen bg-[#212121] text-white p-8">
//       <Link to={"/"} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">Go to home</Link>
//         <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>
//         <form onSubmit={addAlbumHandler} className=" bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4">
//             <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="title" className="auth-input" required />
//             <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className="auth-input" required />
//             <input type="file" placeholder="Choose Thumbnail" onChange={fileChangeHandler} required className="auth-input" accept="image/*"/>
//             <button className="auth-btn" style={{width:"100px"}} disabled={btnLoading}>{btnLoading?"Please wait...":"Add"}</button>
//         </form>



//          <h2 className="text-2xl font-bold mb-6 mt-6">Add Song</h2>
//         <form onSubmit={addSongHandler} className=" bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4">
//             <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="title" className="auth-input" required />
//             <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className="auth-input" required />
//             <input type="file" placeholder="Choose audio" onChange={fileChangeHandler} required className="auth-input" accept="audio/*"/>
//             <select className="auth-input" value={album} onChange={(e)=>setAlbum(e.target.value)} required>
//                 <option value="">Choose Album</option>
//                 {
//                     albums?.map((e:any,index:number)=>{
//                         return <option value={e.id} key={index}>{e.title}</option>
//                     })
//                 }
//             </select>
//             <button className="auth-btn" style={{width:"100px"}} disabled={btnLoading}>{btnLoading?"Please wait...":"Add"}</button>
//         </form>
//         <div className="mt-8">
//             <h3 className="text-xl font-semibold mb-4">Added Albums</h3>
//             <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
//                 {
//                     albums?.map((e,index)=>{
//                         return <div className="bg-[#181818] p-4 rounded-lg shadow-md" key={index}>
                            
//                                 <img src={e.thumbnail} className="mr-1 w-34 h-32" alt="" />
//                                 <h4 className="text-lg font-bold">{e.title}</h4>
//                                 <h4 className="text-lg font-bold">{e.description.slice(0,30)}...</h4>
//                                 <button className="px-3 py-1 bg-red-500 text-white rounded" disabled={btnLoading} onClick={()=>deleteAlbum(e.id)}> <MdDelete/> </button>               
//                         </div>
//                     })
//                 }
//             </div>
//         </div>

//                 <div className="mt-8">
//             <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
//             <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
//                 {
//                     songs?.map((e,index)=>{
//                         return <div className="bg-[#181818] p-4 rounded-lg shadow-md" key={index}>
                            
//                                 { 
//                                   e.thumbnail ?<img src={e.thumbnail} className="mr-1 w-34 h-32" alt="" />:(
//                                     <div className="flex flex-col justify-center items-center w-[275px]">
//                                         <input type="file" onChange={fileChangeHandler}/>
//                                         <button onClick={()=>addThumbnailHandler(e.id)} className="auth-btn" style={{width:"200px"}} disabled={btnLoading}>{btnLoading?"Please wait...":"Add Thumbnail"}</button>
//                                     </div>
//                                   )
//                                 }
//                                 <h4 className="text-lg font-bold">{e.title}</h4>
//                                 <h4 className="text-lg font-bold">{e.description.slice(0,30)}...</h4>
//                                 <button className="px-3 py-1 bg-red-500 text-white rounded" disabled={btnLoading} onClick={()=>deleteSong(e.id)}> <MdDelete/> </button>               
//                         </div>
//                     })
//                 }
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Admin

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../../context/userContext";
import { useSongData } from "../../context/songContext";
import newRequest from "../../utils/newRequest";
import toast from "react-hot-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useUserData();

  const { albums, songs, fetchAlbum, fetchSongs } = useSongData();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const addAlbumHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    setBtnLoading(true);
    try {
      const { data } = await newRequest.post(`/v1/admin/add-album`, formData);
      toast.success(data.message);
      fetchAlbum();
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };

  const addSongHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("album_id", album);

    setBtnLoading(true);
    try {
      const { data } = await newRequest.post(`/v1/admin/add-song`, formData);
      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setFile(null);
      setAlbum("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };

  const addThumbnailHandler = async (id: string) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setBtnLoading(true);
    try {
      const { data } = await newRequest.post(`/v1/admin/add-thumbnail/${id}`, formData);
      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setFile(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  };

  const deleteAlbum = async (id: string) => {
    if (confirm("Are you sure you want to delete this album")) {
      setBtnLoading(true);
      try {
        await newRequest.delete(`/v1/admin/delete-album/${id}`);
        toast.success("Album deleted successfully");
        setBtnLoading(false);
        fetchAlbum();
      } catch (err: any) {
        toast.error(err.response?.data?.message || "An error occured");
        setBtnLoading(false);
      }
    }
  };

  const deleteSong = async (id: string) => {
    if (confirm("Are you sure you want to delete this song")) {
      setBtnLoading(true);
      try {
        await newRequest.delete(`/v1/admin/delete-song/${id}`);
        toast.success("Song deleted successfully");
        setBtnLoading(false);
        fetchSongs();
      } catch (err: any) {
        toast.error(err.response?.data?.message || "An error occured");
        setBtnLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-gray-900 p-8">
      <Link
        to={"/"}
        className="bg-[#90caf9] hover:bg-[#64b5f6] text-gray-900 font-semibold py-2 px-5 rounded-full transition"
      >
        Go to home
      </Link>

      {/* Add Album Section */}
      <h2 className="text-2xl font-bold mb-6 mt-8 text-center">Add Album</h2>
      <form
        onSubmit={addAlbumHandler}
        className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center gap-5 max-w-[500px] mx-auto"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#90caf9]"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#90caf9]"
          required
        />
        <input
          type="file"
          placeholder="Choose Thumbnail"
          onChange={fileChangeHandler}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#90caf9]"
          accept="image/*"
        />
        <button
          className="w-full max-w-[180px] bg-[#90caf9] text-gray-900 font-semibold py-3 rounded-full hover:bg-[#64b5f6] transition disabled:opacity-50"
          disabled={btnLoading}
        >
          {btnLoading ? "Please wait..." : "Add"}
        </button>
      </form>

      {/* Add Song Section */}
      <h2 className="text-2xl font-bold mb-6 mt-10 text-center">Add Song</h2>
      <form
        onSubmit={addSongHandler}
        className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center gap-5 max-w-[500px] mx-auto"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#90caf9]"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#90caf9]"
          required
        />
        <input
          type="file"
          placeholder="Choose audio"
          onChange={fileChangeHandler}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#90caf9]"
          accept="audio/*"
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#90caf9]"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          required
        >
          <option value="">Choose Album</option>
          {albums?.map((e: any, index: number) => (
            <option value={e.id} key={index}>
              {e.title}
            </option>
          ))}
        </select>
        <button
          className="w-full max-w-[180px] bg-[#90caf9] text-gray-900 font-semibold py-3 rounded-full hover:bg-[#64b5f6] transition disabled:opacity-50"
          disabled={btnLoading}
        >
          {btnLoading ? "Please wait..." : "Add"}
        </button>
      </form>

      {/* Albums List */}
      <div className="mt-10 max-w-[1100px] mx-auto">
        <h3 className="text-xl font-semibold mb-6">Added Albums</h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          {albums?.map((e, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md w-80 flex flex-col items-center"
            >
              <img
                src={e.thumbnail}
                alt={`${e.title} thumbnail`}
                className="mb-3 w-full h-40 object-contain rounded-md"
              />
              <h4 className="text-lg font-bold mb-1 text-center">{e.title}</h4>
              <p className="text-gray-700 text-sm mb-3 text-center">
                {e.description.length > 60
                  ? e.description.slice(0, 60) + "..."
                  : e.description}
              </p>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                disabled={btnLoading}
                onClick={() => deleteAlbum(e.id)}
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Songs List */}
      <div className="mt-14 max-w-[1100px] mx-auto">
        <h3 className="text-xl font-semibold mb-6">Added Songs</h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          {songs?.map((e, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md w-80 flex flex-col items-center"
            >
              {e.thumbnail ? (
                <img
                  src={e.thumbnail}
                  alt={`${e.title} thumbnail`}
                  className="mb-3 w-full h-40 object-contain rounded-md"
                />
              ) : (
                <div className="flex flex-col justify-center items-center w-full mb-3">
                  <input type="file" onChange={fileChangeHandler} className="mb-3" />
                  <button
                    onClick={() => addThumbnailHandler(e.id)}
                    className="w-full max-w-[200px] bg-[#90caf9] text-gray-900 font-semibold py-2 rounded-full hover:bg-[#64b5f6] transition disabled:opacity-50"
                    disabled={btnLoading}
                  >
                    {btnLoading ? "Please wait..." : "Add Thumbnail"}
                  </button>
                </div>
              )}
              <h4 className="text-lg font-bold mb-1 text-center">{e.title}</h4>
              <p className="text-gray-700 text-sm mb-3 text-center">
                {e.description.length > 60
                  ? e.description.slice(0, 60) + "..."
                  : e.description}
              </p>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                disabled={btnLoading}
                onClick={() => deleteSong(e.id)}
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
