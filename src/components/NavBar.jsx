import { Link } from "react-router-dom"


export default function NavBar() {
  return (



    <div className="header">
      <div className="nav-bar">
        <nav className="nav-container">
          <div className="left-and-middle-nav">
            <div className="middle-nav-bar">
              <Link to="/">Home</Link>
              <Link to="/About us">About us</Link>
              <Link to="/Jobs">Jobs</Link>
            </div>
          </div>
          <div className="nav-bar-login">
            <Link to="/Login">Login</Link>
          </div>
        </nav>
        <div className="slogan">
          <h1>Find your occult items today!</h1>
        </div>
      </div>
    </div>
  )
}