import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListOfAllRecipes } from "./handler/ListOfAllRecipes";
import "../style/home.css";

export function Home() {
  const url = `http://${process.env.REACT_APP_API_URL}/misc`;

  const [freshRecipes, setFreshRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/fresh`)
      .then(({ data }) => {
        setFreshRecipes(data.fresh);
      })
      .catch((err) => console.log(err));
    axios.get(`${url}/popular`).then(({ data }) => {
      setPopularRecipes(data.popular);
    });
  }, []);

  return (
    <div className="home">
      <div className="blocky">
        <div className="fresh">
          <h1>Fresh and New</h1>
          <ListOfAllRecipes recipes={freshRecipes} />
        </div>
        <div className="popular">
          <h1>Popular</h1>
          <ListOfAllRecipes recipes={popularRecipes} />
        </div>
      </div>
    </div>
  );
}
