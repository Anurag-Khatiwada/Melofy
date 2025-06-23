import {FaMusic} from "react-icons/fa"
import { useUserData } from "../../context/userContext"
const PlayListCard = () => {
  const {user, isAuth} = useUserData()
  return (
    <div className="flex items-center p-4 rounded-lg shadow-mg cursor-pointer hover:bg-[#ffff1626]">
      <div className="w-10 h-10 bg-grey-600 felx items-center justify-center rounded-md ">
        <FaMusic className="text-white text-xl "/>
      </div>
      <div className="ml-4 ">
        <h2>My PlayList</h2>
        <p className="text-gray-400 text-sm">PlayList •{" "} {isAuth? <span>{user?.name}</span>: <span>{"User"}</span>} </p>
      </div>
    </div>
  )
}

export default PlayListCard
