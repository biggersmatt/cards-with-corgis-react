import { Link } from "react-router-dom";
require("./Navbar.css");

function Navbar(props) {
  return (
    <nav className="shadow">
      {!props.userId ? 
      <Link to="/createparty" className="navbar-link">New Deck</Link>  
        : null
      }
      {!props.userId ? 
        <Link to="/" className="navbar-link">Login</Link>  
        : null
      }
      {props.userId ? 
      <Link to="/playorcreate" className="navbar-link">Play or Create</Link>   
        : null
      }
      {props.userId ? 
        <Link to="/" className="navbar-link" onClick={props.handleSignOut}>Logout</Link>  
        : null
      }
    </nav>
  )
}

export default Navbar;