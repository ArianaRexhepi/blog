import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Navbar = () => {
  const navbarCenterStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const teaLinkStyle = {
    fontSize: '24px',
    color: 'black', 
    textDecoration: 'none',
    fontWeight: 'bold',
    letterSpacing: '2px',
    fontFamily: 'Gloria Hallelujah, cursive',
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
              <Link to="/giftideas">Gift Ideas</Link>
            </div>
          )}
        </div>
        <Link to="#">Food</Link>
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
      </div>
      <div style={navbarCenterStyle}>
      <Link to="home" style={teaLinkStyle} onMouseOver={() => {}} onMouseOut={() => {}}>
        TEA WITH ARI
      </Link>
    </div>
      <div className="navbar-right">
        {/* <Link to="#">Travel</Link> */}
        <Link to="#">Relationships</Link>
        <Link to="booklist">booklist</Link>
        <Link to="movielist">Movielist</Link>
        <Link to="giftlist">Gift Ideas</Link>
        <Link to="login">Login</Link>
        {/* <DropdownButton id="dropdown-basic-button" title="Account">
          <Dropdown.Item href="login">Login</Dropdown.Item>
          <Dropdown.Item href="booklist">Booklist</Dropdown.Item>
          <Dropdown.Item href="movielist">Movielist</Dropdown.Item>
        </DropdownButton> */}
      </div>
    </nav>
  );
};

export default Navbar;
