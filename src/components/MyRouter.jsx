import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import ItemPage from "../pages/ItemPage.jsx";
import AddListing from "../pages/AddListing.jsx";
import ListingsPage from "../pages/ListingsPage";
import BidsPage from "../pages/UserBidsPage";
import ProfilePage from "../pages/ProfilePage.jsx";
import RemoveListing from "./RemoveListing.jsx";


//Accepts props and passes it to components
function MyRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/AddListing" element={<AddListing />} />
        <Route path="/remove-listing" element={<RemoveListing />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/users" element={<BidsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/*<Route path="/your-listings" element={<UserListings />}/>  --> users listings page will have to be activated when the userlistings page is solved*/}
      </Routes>
    </BrowserRouter>
  );
}

export default MyRouter;
