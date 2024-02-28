import { BrowserRouter, Routes, Route } from "react-router-dom"
import MyNav from "./MyNav.jsx"
import LoginPage from "../pages/loginPage.jsx"
import HomePage from '../pages/HomePage.jsx' 


function MyRouter() {  
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>             
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/" element={<HomePage /> } />
      </Routes>           
    </BrowserRouter>    
  )
}

export default MyRouter