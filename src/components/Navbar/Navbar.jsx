import React from "react";
import "./navbar.css";

import { Link } from "react-router-dom";
// import the icon.png
import { useState } from "react";
import icon from "../../images/icon.jpeg";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div id="nav">
      <div className={`contain_navLinks ${isOpen ? "show" : ""} `}>
        <img src={icon} alt="icon" className="icon" width="50px" />

        <Link to="/" className="linkitem">
          Home
        </Link>

        <Link to="/about" className="linkitem">
          About
        </Link>

        <Link to="/blogs" className="linkitem">
          Blogs
        </Link>

        <Link to="/contacts" className="linkitem">
          Contacts
        </Link>

        <Link to="/register" className="linkitem">
          Register
        </Link>

        <Link to="/login" className="linkitem">
          Login
        </Link>
      </div>
      <div className="burger">
        <FaBars className="nav__hamburger" onClick={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  );
}

export default Navbar;
