import { Link } from "react-router-dom";
import Balance from "../pages/BalancePage";


function NavBar() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const userName = localStorage.getItem("token")
  const isAdmin = localStorage.getItem("isAdmin") === 'true'; 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_id");
    window.location.reload();
    window.location.href = '/';
  };
  
  return (
    <div className="header">
      <div className="nav-bar">
        <nav className="nav-container">
          <a href="/">
            <img
            src="https://i.imgur.com/D1399Py.png"
            alt="ShadowBid Logo"
            className="logo"
            />
          </a>

          <div className="left-and-middle-nav">
            <div className="middle-nav-bar">
              {/* Link to home is always shown */}
              <Link to="/">Home</Link>

              {/* Links shown when user is logged in (not admin) */}
              {isLoggedIn && !isAdmin && (
                <>
                  <Link to="/listings">Your Listings</Link>
                  <Link to="/bids">Your Bids</Link>
                  <Link to="/profile">Profile</Link>
                  <span>{Balance(userName.id)} </span>
                </>
              )}
            

                  {/* Admin-specific links */}
                  {isLoggedIn && isAdmin && (
                    <>
                      <Link to="/listings">Listings</Link>
                      <Link to="/users">Users</Link>
                    </>
                  )}

                {/* Links shown for guests */}
                  {!isLoggedIn && (
                <>
                  <Link to="/about-us">About us</Link>
                  <Link to="/jobs">Jobs</Link>
                </>
              )}
            </div>
          </div>
          <div className="nav-bar-login">
            {/* Visibility of login/logout buttons based on login status */}
            {isLoggedIn ? (              
              <Link to="/">
                <span>Welcome {userName} !</span> &nbsp;
                <button className="rounded-button-small" style={{marginTop: "0px"}} onClick={handleLogout}>
                  Logout
                </button>{" "}
                </Link>
            ) : (
              <Link to="/login-page">Login</Link>
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