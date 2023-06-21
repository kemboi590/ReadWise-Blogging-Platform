import React from "react";
import "./navbar.css";

import { Link } from "react-router-dom";
// import the icon.png
import { useState } from "react";
import icon from "../../images/icon.jpeg";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiLogInCircle } from "react-icons/bi";
import { BiRegistered } from "react-icons/bi";
import { MdPermContactCalendar } from "react-icons/md";
import { FaBlogger } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div id="nav">
      <div className={`contain_navLinks ${isOpen ? "show" : ""} `}>
        <img src={icon} alt="icon" className="icon" width="50px" />

        <Link to="/">
          <li className="linkitem">
            <FaHome /> Home{" "}
          </li>
        </Link>

        <Link to="/about">
          <li className="linkitem">
            <BsFillInfoCircleFill /> About
          </li>
        </Link>

        <Link to="/blogs">
          <li className="linkitem">
            <FaBlogger /> Blogs{" "}
          </li>
        </Link>

        <Link to="/contacts">
          <li className="linkitem">
            <MdPermContactCalendar /> Contacts{" "}
          </li>
        </Link>

        <Link to="/register">
          <li className="linkitem">
            <BiRegistered /> Register
          </li>
        </Link>

        <Link to="/login">
          <li className="linkitem">
            <BiLogInCircle /> Login{" "}
          </li>
        </Link>

        {/* <Link>
          <li className="linkitem"> Logout </li>
        </Link> */}

        <Link to="/profile">
          <li className="linkitem">
            <CgProfile /> Profile{" "}
          </li>
        </Link>
      </div>
      <div className="burger">
        <FaBars className="nav__hamburger" onClick={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  );
}

export default Navbar;
