import React, { useState } from "react";
import "../style/footer.css";
import WhiteLogo from "../assets/images/logo_white.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
  const [breakfast, setBreakfast] = useState(false);
  const [brunch, setBrunch] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [highlighted, setHighlighted] = useState(false);

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
    <div className="footer">
      <div className="footer-second">
        <Link to={"/home"} onClick={() => setHighlighted(false)}>
          <img src={WhiteLogo} alt="logo_white" className="logo_white" />
        </Link>

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
            <li className="list">
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
          <ul className="list">
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
          <ul className="list">
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
          <ul className="list">
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
    </div>
  );
};
