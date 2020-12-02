import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        SoleMate
      </Link>
      <div>
        <ul className="navbar-nav">
          
        
          <li className="nav-item">
            <Link
              to="/discover"
              className={window.location.pathname === "/discover" ? "nav-link active" : "nav-link"}
            >
              Discover
            </Link>
          </li>
        
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
