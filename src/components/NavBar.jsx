import { Link } from "react-router-dom";

export default function NavBar() {
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
              <Link to="/">Home</Link>
              <Link to="/About us">About us</Link>
              <Link to="/Jobs">Jobs</Link>
            </div>
          </div>
          <div className="nav-bar-login">
            <Link to="/login-page">Login Page</Link>
          </div>
        </nav>
        <div className="slogan">
          <h1>Find your occult items today!</h1>
        </div>
      </div>
    </div>
  );
}
