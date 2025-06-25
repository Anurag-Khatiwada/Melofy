// import React from "react"
// import type{ ReactNode } from "react"
// import Navbar from "../Navbar/Navbar"
// import Sidebar from "../Sidebar/Sidebar"
// import Player from "../Player/Player"

// interface LayoutProps{
//     children : ReactNode
// }

// const Layout: React.FC<LayoutProps> = ({children}) => {
//   return (
//     <div className='h-screen'>
//       <div className="h-[90%] flex">
//         <Sidebar/>
//         <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:[75%] lg:ml-0">
//             <Navbar/>
//             {children}

//         </div>
//       </div>
//       <Player/>
//     </div>
//   )
// }

// export default Layout



import React from "react"
import type { ReactNode } from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Player from "../Player/Player"

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-[#F4F6F8] text-[#212121]">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 m-4 p-6 pt-4 rounded bg-[#FAFAFA] shadow-md overflow-auto">
          <Navbar />
          <div className="mt-4">{children}</div>
        </main>
      </div>
      <Player />
    </div>
  )
}

export default Layout
