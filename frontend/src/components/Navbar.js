import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Navbar = () => {
  const navbarCenterStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const teaLinkStyle = {
    fontSize: "24px",
    color: "black",
    textDecoration: "none",
    fontWeight: "bold",
    letterSpacing: "2px",
    fontFamily: "Gloria Hallelujah, cursive",
  };
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
              <Link to="/giftideas">Gift Ideas</Link>
            </div>
          )}
        </div>
        <div
          className="nav-link"
          onMouseEnter={() => setShowSublinks(true)}
          onMouseLeave={() => setShowSublinks(false)}
        >
          Relationship
          {showSublinks && (
            <div className="sublinks">
              <Link to="#">Dating Tips</Link>
              <Link to="#">Friendships</Link>
            </div>
          )}
        </div>
        <div
          className="nav-link"
          onMouseEnter={() => setShowSublinks(true)}
          onMouseLeave={() => setShowSublinks(false)}
        >
          Food
          {showSublinks && (
            <div className="sublinks">
              <Link to="#">Best Recepies</Link>
              <Link to="#">Drink</Link>
            </div>
          )}
        </div>
      </div>
      <div style={navbarCenterStyle}>
        <Link
          to="home"
          style={teaLinkStyle}
          onMouseOver={() => {}}
          onMouseOut={() => {}}
        >
          TEA WITH ARI
        </Link>
      </div>
      <div className="navbar-right">
        <div
          className="nav-link"
          onMouseEnter={() => setShowSublinks(true)}
          onMouseLeave={() => setShowSublinks(false)}
        >
          Travel
          {showSublinks && (
            <div className="sublinks">
              <Link to="#">Family Vacations</Link>
              <Link to="#">Packing Tips</Link>
            </div>
          )}
        </div>
        
        <div
          className="nav-link"
          onMouseEnter={() => setShowSublinks(true)}
          onMouseLeave={() => setShowSublinks(false)}
        >
          Technology
          {showSublinks && (
            <div className="sublinks">
              <Link to="technology">Latest News</Link>
            </div>
          )}
        </div>
        {/* <Link to="booklist">booklist</Link>
        <Link to="movielist">Movielist</Link>
        <Link to="techlist">Techlist</Link>
        <Link to="giftlist">Gift Ideas</Link>
        <Link to="login">Login</Link> */}
        <div>
          <>
            <div class="btn-group">
              <button
                class="btn btn-white btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="booklist">
                  Booklist
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="movielist">
                  Movielist
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="techlist">
                  Techlist
                  </a>
                </li>
              </ul>
            </div>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
