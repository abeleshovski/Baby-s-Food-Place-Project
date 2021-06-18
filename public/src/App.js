import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { MyProfile } from "./components/MyProfile";
import Cookies from "universal-cookie";
import { MyRecipes } from "./components/MyRecipes";
import { CreateRecipe } from "./components/CreateRecipe";
import { Footer } from "./components/Footer";

export default function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const refresh = `http://${process.env.REACT_APP_API_URL}/auth/refresh-token`;

  useEffect(() => {
    fetch(refresh, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => cookies.set("token", data.token, { path: "/" }));
  }, []);

  return (
    <AuthContextProvider>
      <Nav />
      {/* <Redirect from="/" to="/home"></Redirect> */}
      <div className="container">
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/myprofile" component={MyProfile}></Route>
          <Route path="/myrecipes" component={MyRecipes} />
          <Route path="/newrecipe" component={CreateRecipe} />
        </Switch>
      </div>
      <Footer />
    </AuthContextProvider>
  );
}
