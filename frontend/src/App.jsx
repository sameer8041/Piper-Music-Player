import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ArtistDashboard from './pages/ArtistDashboard'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/artist/dashboard" element={<ArtistDashboard />} />
    </Routes>
  )
}

export default App
