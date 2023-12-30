import React, { useState } from 'react';
import './Navbar.css'; 
import img1 from './images/img1.png';

const Navbar = () => {
  const [showSublinks, setShowSublinks] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
      <a href="/">Home</a>
        <div
          className="nav-link"
          onMouseEnter={() => setShowSublinks(true)}
          onMouseLeave={() => setShowSublinks(false)}
        >
          Style
          {showSublinks && (
            <div className="sublinks">
              <a href="#">Beauty</a>
              <a href="#">Do or Don't</a>
              <a href="#">Fashion of the Day</a>
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
              <a href="#">Movies</a>
              <a href="#">Gift Ideas</a>
              <a href="books">Books</a>
            </div>
          )}
        </div>
        <a href="#">Food</a>
      </div>
      <div className="navbar-center">
        <div className="logo">
          <img src={img1}  alt="Logo" />
        </div>
      </div>
      <div className="navbar-right">
        <a href="#">Travel</a>
        <a href="#">Relationships</a>
        <a href="#">Account</a>
        <a href="login">Login</a>
        <a href="booklist">booklist</a>
        
      </div>
    </nav>
  );
};

export default Navbar;
