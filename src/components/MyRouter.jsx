import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import HomePage from "../pages/HomePage.jsx";
import ItemPage from "../pages/ItemPage.jsx";
import AddListing from "../pages/AddListing.jsx";
import ListingsPage from "../pages/ListingsPage";
import BidsPage from "../pages/UserBidsPage";
import ProfilePage from "../pages/ProfilePage.jsx";
import ViewUsersPage from "../pages/ViewUsersPage.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import Jobs from "../pages/JobsPage.jsx";


import LoginPage from "../pages/loginPage.jsx";



function MyRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/AddListing" element={<AddListing />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/bids" element={<BidsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users" element={<ViewUsersPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/jobs" element={<Jobs />} />


        {/*<Route path="/your-listings" element={<UserListings />}/>  --> users listings page will have to be activated when the userlistings page is solved*/}
      </Routes>
    </BrowserRouter>
  );
}

export default MyRouter;
