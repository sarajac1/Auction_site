import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import LoginPage from "../pages/loginPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import ItemPage from "../pages/ItemPage.jsx";
import AddListing from "../pages/AddListing.jsx"


//Accepts props and passes it to components
function MyRouter({ isLoggedIn, setIsLoggedIn}) {
  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/login-page" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/AddListing" element={<AddListing/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRouter;
