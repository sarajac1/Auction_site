import { BrowserRouter, Routes, Route } from "react-router-dom"
import MyNav from "./MyNav.jsx"
import LoginPage from "../pages/loginPage.jsx"
import Gallery from './Gallery.jsx'
import ItemPage from '../pages/ItemPage.jsx';


function MyRouter() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/" element={<Gallery />} />
        <Route path="/item/:id" element={<ItemPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default MyRouter