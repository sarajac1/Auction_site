import { Link } from "react-router-dom"

export default function NavBar() {
  return (
  <nav>
      <Link to="/">Home</Link>
      <Link to="/About us">About us</Link>
      <Link to="/Jobs"></Link>
      <Link to="/Login"></Link>
  </nav >
  )
}