import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions";

const Navbar = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const [showSublinks, setShowSublinks] = useState(false);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/books");
  };

  let isAdmin = false;
  if (state.user) {
    const role = state.user.userRoles.find((role) => role === "Admin");
    if (role) {
      isAdmin = true;
    }
  }
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
              <Link to="friendships">Friendships</Link>
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
              <Link to="recepies">Best Recepies</Link>
              {/* <Link to="drinks">Drinks</Link> */}
            </div>
          )}
        </div>
      </div>
      <div style={navbarCenterStyle}>
        <Link
          to="/books"
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
              <Link to="vacations">Family Vacations</Link>
              <Link to="packing">Packing Tips</Link>
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
        
        <div>
          {isAdmin && (
            <>
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dashboard
                </a>
                <ul className="dropdown-menu">
                  <li className="mb-2">
                    <Link to="booklist">BookList</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="beautylist">BeautyList</Link>
                  </li>
                  {/* <li className="mb-2">
                    <Link to="drinkslist">DrinksList</Link>
                  </li> */}
                  <li className="mb-2">
                    <Link to="datinglist">DatingList</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="fashionlist">FashionList</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="friendshiplist">FriendshipList</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="giftlist">GiftList</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="movielist">MovieList</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="packinglist">PackingList</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="recepielist">RecepieList</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="techlist">TechList</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="vacationslist">VacationList</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="userlist">UserList</Link>
                  </li>
                  </ul>
              </div>
            </>
          )}
        </div>
        {state.user && (
            <>
              <div className="dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {state.user.username}
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link to="/myprofile" className="nav-link">
                      My Profile
                    </Link>
                  </li>
                  <li className="dropdown-item" onClick={() => handleLogOut()}>
                    Logout
                  </li>
                </ul>
              </div>
            </>
          )}
        {!state.user && (
          <>
            <div className="nav-link">
              <Link to="login">Sign in</Link>
            </div>
          </>
        )}

       
      </div>
    </nav>
  );
};

export default Navbar;
