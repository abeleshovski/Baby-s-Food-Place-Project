import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListOfAllRecipes } from "./handler/ListOfAllRecipes";
import "../style/home.css";

export function Breakfast() {
  const url = `http://${process.env.REACT_APP_API_URL}/api/misc`;

  const [breakfast, setBreakfast] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        const food = data.recipes;
        const feed = food.filter((cat) => cat.category === "breakfast");
        setBreakfast(feed);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(breakfast);

  return (
    <div className="home">
      <div className="block">
        <div className="fresh">
          <h1>Breakfast</h1>
          <ListOfAllRecipes recipes={breakfast} />
        </div>
      </div>
    </div>
  );
}
