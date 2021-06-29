import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import time from "../../assets/images/icon_time.svg";
import plate from "../../assets/images/icon_plate.svg";
import star from "../../assets/images/icon_star.svg";
import "../../style/recipeCard.css";
import arrow from "../../assets/images/icon_arrows_white.svg";

export const ListOfAllRecipes = (props) => {
  const recipesList = props.recipes.length ? (
    props.recipes.map((recipe, id) => {
      const [likes, setLikes] = useState(`${recipe.likes}`);
      const [isLiked, setIsLiked] = useState(false);

      const storageUrl = `http://${process.env.REACT_APP_API_URL}/api/misc`;

      const imageUrl = `${storageUrl}/${recipe.imageName}`;

      const cookies = new Cookies();
      const url = `http://${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`;
      const token = cookies.get("token");

      //like button
      const handleLike = (e) => {
        if (!token) {
          alert("Please log in");
        }
        fetch(`${url}/like`, {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setLikes(data.recipe.likes);
            setIsLiked(true);
          })
          .catch((err) => console.log(err));
      };

      //dislike button
      const handleDislike = (e) => {
        fetch(`${url}/dislike`, {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setLikes(data.recipe.likes);
            setIsLiked(false);
          });
      };
      //shorten the string
      const truncate = (str, n) => {
        return str.length > n ? str.substring(0, n - 1) + "..." : str;
      };

      return (
        <div className="recipeCard" key={id}>
          <div className="card">
            <img
              src={imageUrl}
              id="image"
              alt="imagine if there was an alt here"
            ></img>
            <h4>{recipe.title} </h4>
            <p>{truncate(recipe.description, 150)}</p>
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
                {isLiked === false && (
                  <span>
                    <img
                      src={star}
                      onClick={handleLike}
                      className="like"
                      alt=""
                    />
                    {likes}
                  </span>
                )}
                {isLiked === true && (
                  <span>
                    <img
                      src={star}
                      onClick={handleDislike}
                      alt=""
                      className="dislike"
                    />
                    {likes}
                  </span>
                )}
              </div>
              <span>
                <Link to={`/${recipe._id}`}>
                  <img
                    src={arrow}
                    alt=""
                    className="arrow"
                    onClick={() =>
                      cookies.set("recipeId", recipe._id, { path: "/" })
                    }
                  ></img>
                </Link>
              </span>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p></p>
  );
  return <div className="recipes collection">{recipesList}</div>;
};
