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
import "./style/App.css";
import { SpecificRecipe } from "./components/SpecificRecipe.js";
import { Breakfast } from "./components/Breakfast";
import { Brunch } from "./components/Brunch";
import { Lunch } from "./components/Lunch";
import { Dinner } from "./components/Dinner";

export default function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const refresh = `http://${process.env.REACT_APP_API_URL}/api/auth/refresh-token`;

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
      <div className="container">
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/myprofile" component={MyProfile}></Route>
          <Route path="/myrecipes" component={MyRecipes} />
          <Route path="/newrecipe" component={CreateRecipe} />
          <Route
            path={`/${cookies.get("recipeId")}`}
            component={SpecificRecipe}
          ></Route>
          <Route path="/breakfast" component={Breakfast} />
          <Route path="/brunch" component={Brunch} />
          <Route path="/lunch" component={Lunch} />
          <Route path="/dinner" component={Dinner} />
        </Switch>
      </div>
      <p id="mobile">Please use a pc...thanks</p>
      <Footer id="footer" />
    </AuthContextProvider>
  );
}
