import React from "react";
import { SvgRocket } from "../Logo/Logo";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, handleLogout }) {
  return (
    <div className="nav">
      <Link to="/">
        <img
          className="nav__logo"
          src="https://i.imgur.com/ic7njgq.png"
          alt="landscape terrain logo"
        />
      </Link>

      <div className="nav__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleLogout} className="nav__option">
            <span className="nav__optionLineOne">
              {!user ? "Guest" : user.email}
            </span>
            <span className="nav__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        {!user ? (
          ""
        ) : (
          <Link to="/locations">
            <div className="nav__option">
              <span className="nav__optionLineOne"> My Locations</span>
            </div>
          </Link>
        )}

        <Link to="/signup">
          <div className="nav__option">
            <span className="nav__optionLineOne"> or Sign Up</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
