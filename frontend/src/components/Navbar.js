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
              <Link to="fashion">Fashion of the Day</Link>
              <Link to="beauty">Beauty</Link>
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
              <Link to="/giftideas">Gifts</Link>
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
              <Link to="dating">Dating Tips</Link>
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
          to="/"
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
              className="btn btn-primary btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </button>
            <ul className="dropdown-menu">
              <li className="mb-2">
                <Link to="booklist">BookList</Link>
              </li>
              <li className="mb-2">
                <Link to="movielist">MovieList</Link>
              </li>
              <li className="mb-2">
                <Link to="techlist">TechList</Link>
              </li>
              <li className="mb-2">
                <Link to="giftlist">GiftList</Link>
              </li>
              <li className="mb-2">
                <Link to="drinkslist">DrinksList</Link>
              </li>
              <li className="mb-2">
                <Link to="beautylist">BeautyList</Link>
              </li>
              <li className="mb-2">
                <Link to="fashionlist">FashionList</Link>
              </li>
              <li className="mb-2">
                <Link to="datinglist">DatingList</Link>
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
