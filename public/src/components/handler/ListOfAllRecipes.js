import React from "react";

export const ListOfAllRecipes = (props) => {
  const recipesList = props.recipes.length ? (
    props.recipes.map((recipe, id) => {
      return (
        <div className="collection-item" key={id}>
          <span>{recipe.title} </span>
        </div>
      );
    })
  ) : (
    <p>There seem to be no recipes atm</p>
  );
  return <div className="recipes collection">{recipesList}</div>;
};
