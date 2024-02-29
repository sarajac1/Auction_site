import { Link } from "react-router-dom";

//Accepts isLoggedIn as a prop 
function NavBar({ isLoggedIn }) {
  return (
    <div className="header">
      <div className="nav-bar">
        <nav className="nav-container">
          <img
            src="https://i.imgur.com/D1399Py.png"
            alt="ShadowBid Logo"
            className="logo"
          />
          <div className="left-and-middle-nav">
            <div className="middle-nav-bar">
              {/* Link to home is always shown */}
              <Link to="/">Home</Link>
              <Link to="/AddListing">Add Listing</Link>

              {/* Links that are dependent on if user is logged in */}
              {isLoggedIn ? (
                <>
                  <Link to="/your-listings">Your Listings</Link>
                  <Link to="/profile">Profile</Link>
                  <Link to="/balance">Balance: </Link>
                  <Link to="/your-bids">Your Bids</Link>
                </>
              ) : (
                <>
                  {/* Links that are shown for guests */}
              
                  <Link to="/about us">About us</Link>
                  <Link to="/jobs">Jobs</Link>
                </>
              )}
            </div>
          </div>
          <div className="nav-bar-login">
            {isLoggedIn ? (
              <Link to="/logout">Logout</Link>
            ) : (
              <Link to="/login-page">Login Page</Link>
            )}
          </div>
        </nav>
        <div className="slogan">
          <h1>Find your occult items today!</h1>
        </div>
      </div>
    </div>
  );
}

export default NavBar; 
