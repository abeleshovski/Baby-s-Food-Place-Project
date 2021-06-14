import React from "react";
import { Switch, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { MyProfile } from "./components/MyProfile";
import Cookies from "universal-cookie";
import { MyRecipes } from "./components/MyRecipes";
import { CreateRecipe } from "./components/CreateRecipe";

export default function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const id = cookies.get("id");

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  console.log(parseJwt(token));

  console.log(id);
  // console.log(token)
  return (
    <AuthContextProvider>
      <Nav />
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/myprofile" component={MyProfile}></Route>
        <Route path="/myrecipes" component={MyRecipes} />
        <Route path="/newrecipe" component={CreateRecipe} />
      </Switch>
    </AuthContextProvider>
  );
}
