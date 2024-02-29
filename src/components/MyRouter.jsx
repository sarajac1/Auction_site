import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import LoginPage from "../pages/loginPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import ListingsPage from "../pages/ListingsPage";
import BidsPage from "../pages/UserBidsPage";



function MyRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/bids" element={<BidsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRouter;
