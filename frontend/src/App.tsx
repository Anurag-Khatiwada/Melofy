import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    
  )
}

export default App
