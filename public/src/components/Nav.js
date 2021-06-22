import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../style/nav.css";
import logo from "../assets/images/logo_color.svg";
import AuthContext from "../context/AuthContextProvider";
import Cookies from "universal-cookie";

export const Nav = () => {
  const { loggedIn } = useContext(AuthContext);
  const cookies = new Cookies();

  return (
    <nav className="navbar">
      <Link to={"/home"}>
        <img src={logo} alt="logo_color" className="logo_color" />
      </Link>

      <div className="navbar-links">
        <ul>
          <li>
            <a>BREAKFAST</a>
          </li>
          <li>
            <a>BRUNCH</a>
          </li>
          <li>
            <a>LUNCH</a>
          </li>
          <li>
            <a>DINNER</a>
          </li>
        </ul>
      </div>

      {!loggedIn && (
        <div className="condition">
          <Link to={"/login"}>
            <button className="btnLogIn">LOG IN</button>
          </Link>

          <span>or</span>

          <Link to={"/register"}>
            <button className="btnCreateAcc">CREATE ACCOUNT</button>
          </Link>
        </div>
      )}
      {loggedIn && (
        <ul className="condition">
          <li>
            <Link to="/myrecipes" className="btnMyRecipe">
              MY RECIPES
            </Link>
          </li>
          <li>
            <Link to="/myprofile" className="btnMyProfile">
              MY PROFILE
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
