import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ListOfAllRecipes } from "./handler/ListOfAllRecipes";

export function Home() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const id = cookies.get("id");
  const url = `http://${process.env.REACT_APP_API_URL}/misc/fresh`;
  const storageUrl = `http://${process.env.REACT_APP_API_URL}/storage/new`;
  const [freshRecipes, setFreshRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        setFreshRecipes(data.fresh);
        axios.get();
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <h1>Fresh and New</h1>
        <ListOfAllRecipes recipes={freshRecipes} />
      </div>
    </div>
  );
}
