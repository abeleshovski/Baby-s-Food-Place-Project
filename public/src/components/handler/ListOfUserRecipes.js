import React from "react";
import "../../style/userRecipes.css";
import Cookies from "universal-cookie";
import axios from "axios";
import trash from "../../assets/images/icon_trashcan.svg";

export const ListOfRecipes = (props) => {
  const recipesList = props.recipes.length ? (
    props.recipes.map((recipe, id) => {
      const cookies = new Cookies();
      console.log(recipe._id);
      const token = cookies.get("token");
      const deleteUrl = `http://${process.env.REACT_APP_API_URL}/api/recipes/delete/${recipe._id}`;
      const deleteRecipe = () => {
        axios
          .delete(deleteUrl, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            window.location.reload();
          });
      };
      return (
        <div className="recipesCard" key={id}>
          <div id="title">
            <span>{recipe.title} </span>
          </div>
          <div id="other">
            <span id="category">{recipe.category}</span>
            <div id="otherOther">
              <span>
                {recipe.createdAt.slice(8, 10)}-{recipe.createdAt.slice(5, 7)}-
                {recipe.createdAt.slice(0, 4)}
              </span>
              <img id="trash" src={trash} alt="" onClick={deleteRecipe}></img>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p className="center"></p>
  );
  return <div className="recipe">{recipesList}</div>;
};
