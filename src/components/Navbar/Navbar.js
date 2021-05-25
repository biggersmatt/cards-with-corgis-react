import { Link } from "react-router-dom";
require("./Navbar.css");

function Navbar(props) {
  return (
    <nav>
      {/* <Link to="/createparty" className="navbar-link">New Party</Link>  */}
      {!props.userId ? 
      <Link to="/createparty" className="navbar-link">New Party</Link>  
        : null
      }
      {!props.userId ? 
        <Link to="/" className="navbar-link">Login</Link>  
        : null
      }
      {props.userId ? 
      <Link to="/playorcreate" className="navbar-link">Home</Link>   
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