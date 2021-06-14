import React, { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
const AuthContext = createContext();

function AuthContextProvider(props) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [loggedIn, setLoggedIn] = useState();

  function getLoggedIn() {
    if (!token) {
      setLoggedIn(false);
    } else if (token) {
      setLoggedIn(true);
    }
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export { AuthContextProvider };
