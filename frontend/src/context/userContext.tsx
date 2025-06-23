import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import newRequest from "../utils/newRequest";
import toast, {Toaster} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { SongProvider } from "./songContext";

export interface User{
    _id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    playlist: string[]
}

interface UserContextType{
    user: User | null;
    isAuth: boolean;
    loading: boolean;
    btnLoading: boolean;
    loginUser: (
        email:string,
        password:string,
        navigate: (path:string)=>void
    )=>Promise<void>;
    registerUser: (
        name:string,
        email:string,
        password:string,
        role:string,
        navigate: (path:string)=>void
    )=>Promise<void>;
    addToPlayList: (id:string)=>void;
    logoutUser : ()=>Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps{
    children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({children})=>{
    
    const [user, setUser] = useState<User|null>(null)
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const navigate = useNavigate()

     const registerUser = async(name:string, email:string, password:string,role:string, navigate:(path:string)=>void)=>{
        setBtnLoading(true)
        console.log({ name, email, password, role });
        try{
            const {data} = await newRequest.post(`/v1/user/register`,{
                name,
                email,
                password,
                role
            })

            toast.success(data.message)
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken);
            setUser(data.user)
            setIsAuth(true)
            setBtnLoading(false)
            navigate('/')
            
        }catch(err: any){
            toast.error(err.response?.data?.message || "An error occured")
            setBtnLoading(false)
        }
    }

    const loginUser = async(email:String, password:String, navigate:(path:string)=>void)=>{
        setBtnLoading(true)
        try{
            const {data} = await newRequest.post(`/v1/user/login`,{
                email,
                password
            })

            toast.success(data.message)
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken);
            setUser(data.user)
            setIsAuth(true)
            setBtnLoading(false)
            navigate('/')
            
        }catch(err: any){
            toast.error(err.response?.data?.message || "An error occured")
            setBtnLoading(false)
        }
    }

    async function fetchUser(){
        try{
            const {data} = await newRequest.get(`/v1/user/my-profile`)
            setUser(data.user)
            setIsAuth(true)
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)

        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

    const  logoutUser = async()=>{
        try{
            await newRequest.post(`/v1/user/logout`,{
                refreshToken: localStorage.getItem("refreshToken")
            })
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            setUser(null);
            setIsAuth(false)            
            toast.success("User Logged Out")
        }catch(err:any){
            toast.error(err.response?.data?.message || "An error occured")
        }
    }

    const addToPlayList = async(id:string)=>{
        try{
            const {data} = await newRequest.post(`/v1/user/add-to-playlist/${id}`,{})
            toast.success(data?.message)
            fetchUser()
        }catch(err:any){
            toast.error(err.response?.data?.message || "An error occured")
        }
    }

    return <UserContext.Provider value={{logoutUser,user,isAuth,loading,loginUser,btnLoading,registerUser,addToPlayList}}>
        {children}
        <Toaster/>
        </UserContext.Provider>
}

export const useUserData = (): UserContextType =>{

    const context = useContext(UserContext)

    if(!context){
        throw new Error("useUserData must be used within a UserProvider")
    }
    return context
}