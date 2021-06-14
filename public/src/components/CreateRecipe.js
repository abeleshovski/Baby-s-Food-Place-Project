import React, { useState } from "react";
import Cookies from "universal-cookie";
import FormData from "form-data";

export const CreateRecipe = () => {
  const recipeUrl = `http://${process.env.REACT_APP_API_URL}/recipes/newRecipe`;
  const storageUrl = `http://${process.env.REACT_APP_API_URL}/storage/new`;

  const cookies = new Cookies();
  const token = cookies.get("token");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [description, setDescription] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(category);
    formData.append("image", selectedFile);
    fetch(recipeUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        category: category,
        prepTime: prepTime,
        numberOfPeople: numberOfPeople,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.message);
        } else console.log(data);
      });
  };

  return (
    <div id="create-recipe">
      <form onSubmit={handleSubmit}>
        <input
          type="string"
          placeholder="enter title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <select
          id="category"
          value={category}
          onChange={(event) => {
            const typeOfFood = event.target.value;
            setCategory(typeOfFood);
          }}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
        <input
          type="number"
          placeholder="Enter prep time"
          value={prepTime}
          onChange={(event) => setPrepTime(event.target.value)}
        />
        <input
          type="number"
          placeholder="Enter number of people"
          value={numberOfPeople}
          onChange={(event) => setNumberOfPeople(event.target.value)}
        />
        <input
          type="string"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button type="submit">Post Recipe</button>
      </form>
    </div>
  );
};
