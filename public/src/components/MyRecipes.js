import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContextProvider";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { ListOfRecipes } from "./handler/ListOfUserRecipes";
import "../style/myRecipes.css";
import plus from "../assets/images/icon_plus_white.svg";

export const MyRecipes = () => {
  const { loggedIn } = useContext(AuthContext);

  const history = useHistory();

  const [recipes, setRecipes] = useState([]);

  useEffect(async () => {
    const cookies = new Cookies();
    const id = cookies.get("id");
    const url = `http://${process.env.REACT_APP_API_URL}/recipes/fetch/${id}`;
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

  const newRecipe = (e) => {
    history.push("/newrecipe");
  };

  return (
    <div className="myrecipes">
      {!loggedIn && (
        <div>
          <h2>You need to log in to see your recipes</h2>
        </div>
      )}
      {loggedIn && (
        <div>
          <div id="addRecipe">
            <h2>My recipes</h2>
            <img src={plus} onClick={newRecipe} id="plus" alt=""></img>
          </div>
          <div>
            <div id="sbeve">
              <span id="item">Recipe name</span>
              <div id="item2">
                <span>Category</span>
                <div id="item3">
                  <span>Created At</span>
                  <span>Delete</span>
                </div>
              </div>
            </div>
            <ListOfRecipes recipes={recipes} />
          </div>
        </div>
      )}
    </div>
  );
};
