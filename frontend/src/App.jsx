import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ArtistDashboard from './pages/ArtistDashboard'
import CreateMusic from './pages/CreateMusic'
import MusicPlayer from './pages/MusicPlayer'
import { io } from "socket.io-client"

function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io("http://localhost:3002", {
      withCredentials: true
    })
    setSocket(newSocket)
    newSocket.on("play", (data) => {
      const musicId = data.musicId

      window.location.href = `/music/${musicId}`
    })
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Home socket={socket} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/artist/dashboard" element={<ArtistDashboard />} />
      <Route path="/artist/dashboard/create-music" element={<CreateMusic />} />
      <Route path="/music/:id" element={<MusicPlayer />} />
    </Routes>
  )
}

export default App
