import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ArtistDashboard from './pages/ArtistDashboard'
import CreateMusic from './pages/CreateMusic'
import MusicPlayer from './pages/MusicPlayer'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/artist/dashboard" element={<ArtistDashboard />} />
      <Route path="/artist/dashboard/create-music" element={<CreateMusic />} />
      <Route path="/music/:id" element={<MusicPlayer />} />
    </Routes>
  )
}

export default App
