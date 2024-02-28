import { BrowserRouter, Routes, Route } from "react-router-dom"
import MyNav from "./MyNav.jsx"
import LoginPage from "../pages/loginPage.jsx"


function MyRouter() {  
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>             
        <Route path="/login-page" element={<LoginPage />} />
      </Routes>           
    </BrowserRouter>    
  )
}

export default MyRouter
