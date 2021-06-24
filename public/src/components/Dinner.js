import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListOfAllRecipes } from "./handler/ListOfAllRecipes";
import "../style/home.css";

export function Dinner() {
  const url = `http://${process.env.REACT_APP_API_URL}/api/misc`;

  const [getFood, setGetFood] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        const food = data.recipes;
        const feed = food.filter((cat) => cat.category === "dinner");
        setGetFood(feed);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(getFood);

  return (
    <div className="home">
      <div className="block">
        <div className="fresh">
          <h1>Dinner</h1>
          <ListOfAllRecipes recipes={getFood} />
        </div>
      </div>
    </div>
  );
}
