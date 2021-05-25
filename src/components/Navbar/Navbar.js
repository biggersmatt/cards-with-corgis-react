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
      {/* <Link to="/playorcreate" className="navbar-link">Home</Link>  */}
      {/* <Link to="/playorcreate/play" className="navbar-link">Play</Link>  */}
      {/* <Link to="/playorcreate/create" className="navbar-link">Create</Link>  */}
      {/* <Link to="/playorcreate/create/:id" className="navbar-link">Show</Link>  */}
      {/* <Link to="/" className="navbar-link" onClick={props.handleSignOut}>Logout</Link>  */}
    </nav>
  )
}

export default Navbar;