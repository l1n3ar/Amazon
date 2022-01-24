import React from "react";
import "./Nav.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";

function Nav() {
  const [{ basket, user }, __] = useStateValue();

  function authentication() {
    if (user !== null) {
      signOut(auth).then((user) => {
        console.log("The user with" + user.email + "is signed out");
      });
    }
  }

  return (
    <div className="navbar">
      <Link to="/">
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          className="amazon-logo"
          alt="Amazon Logo"
        />
      </Link>
      <div className="search">
        <input type="text" className="search-bar" />
        <SearchIcon className="search-icon" />
      </div>
      <div className="navbar-items">
        <Link to="/login">
          <div className="navbar-item">
            <span className="upper-line">
              Hello {user === null ? "Guest" : user}
            </span>
            <span className="lower-line" onClick={authentication}>
              {user === null ? "Sign in" : "Sign Out"}
            </span>
          </div>
        </Link>
        <div className="navbar-item">
          <span className="upper-line">Returns</span>
          <span className="lower-line">& Orders</span>
        </div>
        <div className="navbar-item">
          <span className="upper-line">Your</span>
          <span className="lower-line">Prime</span>
        </div>
        <div className="cart">
          <Link to="/checkout">
            <ShoppingBasketIcon className="cart-icon" />
          </Link>
          <span className="cart-text">{basket?.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Nav;
