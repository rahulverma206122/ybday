// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sorry from './pages/Sorry'
import Birthday from './pages/Birthday'
import Memory from './pages/Memory'
import Gifts from './pages/Gifts'
import CakeScreen from './pages/CakeScreen'  // ← ADD
import MusicPlayer from './components/MusicPlayer'
import Message from './pages/Message'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorry" element={<Sorry />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/cake" element={<CakeScreen />} />  {/* ← ADD */}
        <Route path="/message" element={<Message />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App