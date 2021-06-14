import React from "react";

export const ListOfRecipes = (props) => {
  const recipesList = props.recipes ? (
    props.recipes.map((recipe, id) => {
      return (
        <div className="collection-item" key={id}>
          <span>{recipe.title}</span>
        </div>
      );
    })
  ) : (
    <p className="center"></p>
  );
  return <div className="recipes collection">{recipesList}</div>;
};
