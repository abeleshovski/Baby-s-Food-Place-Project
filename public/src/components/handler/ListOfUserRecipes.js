import axios from "axios";
import React, { useState } from "react";
import Cookies from "universal-cookie";

export const ListOfRecipes = (props) => {
  const recipesList = props.recipes.length ? (
    props.recipes.map((recipe, id) => {
      const [likes, setLikes] = useState(`${recipe.likes}`);
      const url = `http://${process.env.REACT_APP_API_URL}/recipes/${recipe._id}/like`;
      const cookies = new Cookies();
      const token = cookies.get("token");
      const handleLike = (e) => {
        fetch(url, {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setLikes(data.recipe.likes);
          })
          .catch((err) => console.log(err));
      };
      return (
        <div className="collection-item" key={id}>
          <span>{recipe.title} </span>
          <span>{recipe._id} </span>
          <span>{likes}</span>
          <button onClick={handleLike}>Like</button>
        </div>
      );
    })
  ) : (
    <p className="center"></p>
  );
  return <div className="recipes collection">{recipesList}</div>;
};
