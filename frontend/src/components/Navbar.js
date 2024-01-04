import React, { useState } from "react";
import "./Navbar.css";
import img1 from "./images/img1.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showSublinks, setShowSublinks] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div
          className="nav-link"
          onMouseEnter={() => setShowSublinks(true)}
          onMouseLeave={() => setShowSublinks(false)}
        >
          Style
          {showSublinks && (
            <div className="sublinks">
              <Link to="#">Beauty</Link>
              <Link to="#">Do or Don't</Link>
              <Link to="#">Fashion of the Day</Link>
            </div>
          )}
        </div>
        <div
          className="nav-link"
          onMouseEnter={() => setShowSublinks(true)}
          onMouseLeave={() => setShowSublinks(false)}
        >
          Desgin
          {showSublinks && (
            <div className="sublinks">
              <Link to="/books">Books</Link>
              <Link to="/movies">Movies</Link>
              <Link to="/gift-ideas">Gift Ideas</Link>
            </div>
          )}
        </div>
        <Link to="#">Food</Link>
      </div>
      <div className="navbar-center">
        <div className="logo">
          <img src={img1} alt="Logo" />
        </div>
      </div>
      <div className="navbar-right">
        <Link to="#">Travel</Link>
        <Link to="#">Relationships</Link>
        <Link to="#">Account</Link>
        <Link to="login">Login</Link>
        <Link to="booklist">Booklist</Link>
      </div>
    </nav>
  );
};

export default Navbar;
