import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContextProvider";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { ListOfRecipes } from "./handler/ListOfRecipes";

export const MyRecipes = () => {
  const cookies = new Cookies();
  const id = cookies.get("id");
  const { loggedIn } = useContext(AuthContext);
  const url = `http://${process.env.REACT_APP_API_URL}/recipes/${id}`;

  const [recipes, setRecipes] = useState([]);

  useEffect(async () => {
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipes(data.recipe);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="myrecipes">
      {!loggedIn && (
        <div>
          <h2>You need to log in to see your recipes</h2>
        </div>
      )}
      {loggedIn && (
        <div>
          <h2>My recipes</h2>
          <h3>
            <Link to="/newrecipe">Add Recipe</Link>
          </h3>
          <ListOfRecipes recipes={recipes} />
        </div>
      )}
    </div>
  );
};
