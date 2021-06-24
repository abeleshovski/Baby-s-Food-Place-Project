import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../style/nav.css";
import logo from "../assets/images/logo_color.svg";
import AuthContext from "../context/AuthContextProvider";
import Cookies from "universal-cookie";

export const Nav = () => {
  const cookies = new Cookies();

  const { loggedIn } = useContext(AuthContext);
  const [breakfast, setBreakfast] = useState(false);
  const [brunch, setBrunch] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [highlighted, setHighlighted] = useState(false);

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };

  const highlightBreakfast = () => {
    setBrunch(false);
    setLunch(false);
    setDinner(false);
    setBreakfast(true);
    setHighlighted(true);
  };

  const highlightBrunch = () => {
    setBrunch(true);
    setLunch(false);
    setDinner(false);
    setBreakfast(false);
    setHighlighted(true);
  };

  const highlightLunch = () => {
    setBrunch(false);
    setLunch(true);
    setDinner(false);
    setBreakfast(false);
    setHighlighted(true);
  };

  const highlightDinner = () => {
    setBrunch(false);
    setLunch(false);
    setDinner(true);
    setBreakfast(false);
    setHighlighted(true);
  };

  return (
    <nav className="navbar">
      <Link to={"/home"} onClick={() => setHighlighted(false)}>
        <img src={logo} alt="logo_color" className="logo_color" />
      </Link>

      <div className="navbar-links">
        {!highlighted && (
          <ul>
            <li>
              <Link to="/breakfast" onClick={highlightBreakfast}>
                BREAKFAST
              </Link>
            </li>
            <li>
              <Link to="/brunch" onClick={highlightBrunch}>
                BRUNCH
              </Link>
            </li>
            <li>
              <Link to="/lunch" onClick={highlightLunch}>
                LUNCH
              </Link>
            </li>
            <li>
              <Link to="/dinner" onClick={highlightDinner}>
                DINNER
              </Link>
            </li>
          </ul>
        )}
        {highlighted && breakfast && (
          <ul>
            <li>
              <Link to="/breakfast" onClick={highlightBreakfast} id="highlight">
                BREAKFAST
              </Link>
            </li>
            <li>
              <Link to="/brunch" onClick={highlightBrunch}>
                BRUNCH
              </Link>
            </li>
            <li>
              <Link to="/lunch" onClick={highlightLunch}>
                LUNCH
              </Link>
            </li>
            <li>
              <Link to="/dinner" onClick={highlightDinner}>
                DINNER
              </Link>
            </li>
          </ul>
        )}
        {highlighted && brunch && (
          <ul>
            <li>
              <Link to="/breakfast" onClick={highlightBreakfast}>
                BREAKFAST
              </Link>
            </li>
            <li>
              <Link to="/brunch" onClick={highlightBrunch} id="highlight">
                BRUNCH
              </Link>
            </li>
            <li>
              <Link to="/lunch" onClick={highlightLunch}>
                LUNCH
              </Link>
            </li>
            <li>
              <Link to="/dinner" onClick={highlightDinner}>
                DINNER
              </Link>
            </li>
          </ul>
        )}
        {highlighted && lunch && (
          <ul>
            <li>
              <Link to="/breakfast" onClick={highlightBreakfast}>
                BREAKFAST
              </Link>
            </li>
            <li>
              <Link to="/brunch" onClick={highlightBrunch}>
                BRUNCH
              </Link>
            </li>
            <li>
              <Link to="/lunch" onClick={highlightLunch} id="highlight">
                LUNCH
              </Link>
            </li>
            <li>
              <Link to="/dinner" onClick={highlightDinner}>
                DINNER
              </Link>
            </li>
          </ul>
        )}
        {highlighted && dinner && (
          <ul>
            <li>
              <Link to="/breakfast" onClick={highlightBreakfast}>
                BREAKFAST
              </Link>
            </li>
            <li>
              <Link to="/brunch" onClick={highlightBrunch}>
                BRUNCH
              </Link>
            </li>
            <li>
              <Link to="/lunch" onClick={highlightLunch}>
                LUNCH
              </Link>
            </li>
            <li>
              <Link to="/dinner" onClick={highlightDinner} id="highlight">
                DINNER
              </Link>
            </li>
          </ul>
        )}
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
          <li>
            <button className="btnLogout" onClick={handleLogout}>
              LOGOUT
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};
