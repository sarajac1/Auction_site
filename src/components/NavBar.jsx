import { Link } from "react-router-dom"


export default function NavBar() {
  return (
  <nav>
      <Link to="/">Home</Link> |&nbsp;
      <Link to="/About us">About us</Link> |&nbsp;
      <Link to="/Jobs">Jobs</Link> |&nbsp;
      <Link to="/Login">Login</Link>
  </nav >
  )
}