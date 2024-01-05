import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

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
              <Link to="drinks">Drinks</Link>
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
        {/* <Link to="login">Login</Link>  */}
        <div>
          <>
            <div className="btn-group">
              <button
                className="btn btn-white btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="booklist">
                  Booklist
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="movielist">
                  Movielist
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="techlist">
                  Techlist
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="giftlist">
                  GiftList
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="drinkslist">
                  DrinksList
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
