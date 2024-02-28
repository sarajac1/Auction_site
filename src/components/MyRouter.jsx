import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from "./NavBar.jsx"
import HomePage from '../pages/HomePage.jsx' 

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage /> } />
      </Routes>
    </BrowserRouter>
  )
}