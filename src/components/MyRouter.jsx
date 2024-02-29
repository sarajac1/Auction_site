import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import LoginPage from "../pages/loginPage.jsx";
import HomePage from "../pages/HomePage.jsx";

//Accepts props and passes it to components
function MyRouter({ isLoggedIn, setIsLoggedIn}) {
  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/login-page" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRouter;
