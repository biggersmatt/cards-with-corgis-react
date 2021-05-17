import { Link } from "react-router-dom";
require("./Navbar.css");

function Navbar() {
  return (
    <nav>
      <Link to="/" className="navbar-link">Login</Link> 
      <Link to="/createparty" className="navbar-link">Party</Link> 
      <Link to="/playorcreate" className="navbar-link">Choose</Link> 
      <Link to="/playorcreate/play" className="navbar-link">Play</Link> 
      <Link to="/playorcreate/create" className="navbar-link">Create</Link> 
      <Link to="/playorcreate/create/:id" className="navbar-link">Show</Link> 
    </nav>
  )
}

export default Navbar;