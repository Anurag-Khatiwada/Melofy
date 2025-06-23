import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Reginster/Register";
import Loading from "./components/Loading/Loading";
import { useUserData } from "./context/userContext";
import Album from "./pages/Album/Album";
import Playlist from "./pages/Playlist/Playlist";
import Admin from "./pages/Admin/Admin"


const App = () => {
  const { isAuth, loading } = useUserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/admin" element={isAuth ? <Admin /> : <Login />}  />

          <Route path="/login" element={isAuth ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/playlist" element={isAuth?<Playlist/> :<Login/>} />

        </Routes>
      )}
    </>
  );
};

export default App;
