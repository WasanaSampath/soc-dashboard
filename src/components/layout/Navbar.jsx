import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="logo">IntelliSOC</span>

        <nav className="nav-links">
          <NavLink to="/dashboard" className="nav-item">
            Dashboard
          </NavLink>
          <NavLink to="/alerts" className="nav-item">
            Alert
          </NavLink>
        </nav>
      </div>

      <div className="navbar-right">
        <span className="icon">🌙</span>
        <span className="icon">🔔</span>
        <span className="icon">👤</span>
      </div>
    </header>
  );
}

export default Navbar;
