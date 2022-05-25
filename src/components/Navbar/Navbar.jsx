import React from "react";
import { SvgRocket } from "../Logo/Logo";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav">
      <SvgRocket />

      <div className="menu_container">
        <a className="menu_link" href="#about">
          About
        </a>
        <a className="menu_link" href="#skills">
          Skills & Tools
        </a>
        <a className="menu_link" href="#portfolio">
          Portfolio
        </a>
        <a className="menu_link" href="#contact">
          Contact
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Sign Out
        </a>
      </div>
    </div>
  );
}

export default Navbar;
