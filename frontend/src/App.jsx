import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import SignupPage from './SignupPage'
import Home from './Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/dashboard" element={<Home />} />
      </Routes>     
    </BrowserRouter>
       
      
    
  )
}

export default App
