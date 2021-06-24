import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import time from "../assets/images/icon_time.svg";
import plate from "../assets/images/icon_plate.svg";
import star from "../assets/images/icon_star.svg";
import "../style/specificRecipe.css";
import exit from "../assets/images/icon_close.svg";
import { useHistory } from "react-router-dom";

export const SpecificRecipe = () => {
  const cookies = new Cookies();
  const url = `http://${
    process.env.REACT_APP_API_URL
  }/api/misc/specific/${cookies.get("recipeId")}`;
  const storageUrl = `http://${process.env.REACT_APP_API_URL}/api/misc`;

  const [recipe, setRecipe] = useState();
  const [imageName, setImageName] = useState("");

  const history = useHistory();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const fetched = data.recipe;
        setRecipe(fetched);
        setImageName(data.recipe.imageName);
      });
  }, []);

  const imageUrl = `${storageUrl}/${imageName}`;

  const truncate = (str, n) => {
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  console.log(recipe);

  return (
    <div>
      {!recipe && <div></div>}
      {recipe && (
        <div id="specificRecipe">
          <div id="background" />
          <div id="left">
            <h2>{recipe.title}</h2>
            <img src={imageUrl} alt="" id="specificImage" />
            <div id="bottomRow">
              <div id="what">
                <h4>Best Server For</h4>
                <span id="category">{recipe.category}</span>
              </div>
              <p>{truncate(recipe.description, 140)}</p>
              <div className="iconz">
                <div className="leftSide">
                  <span>
                    <img src={time} alt="" />
                    {recipe.prepTime} min
                  </span>
                  <span>
                    <img src={plate} alt="" />
                    {recipe.numberOfPeople}
                  </span>

                  <span>
                    <img src={star} className="like" alt="" />
                    {recipe.likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div id="right">
            <div id="what">
              <h4>Recipe Details</h4>
              <h4 id="escape" onClick={() => history.push("/home")}>
                <img src={exit} alt=""></img>
              </h4>
            </div>
            <p>{recipe.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
