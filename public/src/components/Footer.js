import React from "react";
import "../style/footer.css";
import WhiteLogo from "../assets/images/logo_white.svg";

export const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-second">
          <img src={WhiteLogo} alt="logo_white" className="logo_white" />
          <ul className="list">
            <li>BREAKFAST</li>
            <li>BRUNCH</li>
            <li>LUNCH</li>
            <li>DINNER</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
