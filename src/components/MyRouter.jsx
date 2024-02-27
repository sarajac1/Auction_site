import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./NavBar.jsx"

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path />
      </Routes>
    </BrowserRouter>
  )
}