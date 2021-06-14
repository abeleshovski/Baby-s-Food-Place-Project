import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContextProvider";

export function Nav() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {!loggedIn && (
          <div>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </div>
        )}
        {loggedIn && (
          <div>
            <li>
              <Link to="/myprofile">My Profile</Link>
            </li>
            <li>
              <Link to="/myrecipes">My Recipes</Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}
