import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import "../style/createRecipe.css";
import placeholder from "../assets/images/text.svg";

export const CreateRecipe = () => {
  const recipeUrl = `http://${process.env.REACT_APP_API_URL}/api/recipes/newRecipe`;
  const storageUrl = `http://${process.env.REACT_APP_API_URL}/api/storage/new`;
  const history = useHistory();
  const cookies = new Cookies();
  const token = cookies.get("token");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("breakfast");
  const [prepTime, setPrepTime] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState({ preview: "" });
  const [selectedFile, setSelectedFile] = useState();
  const [details, setDetails] = useState("");

  const changeHandler = (event) => {
    const image = event.target.files[0];
    setSelectedFile(image);
    setPreview({ preview: URL.createObjectURL(image) });
    console.log(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const image = selectedFile;
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post(storageUrl, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
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
            details: details,
            imageName: response.data.fileName,
          }),
        })
          .then((res) => res.json())
          .then((info) => {
            if (info.error) {
              alert(info.message);
            } else {
              alert("Recipe Created");
              history.push("/home");
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="create-recipe">
      <form onSubmit={handleSubmit}>
        <div id="imgContainer">
          <span>Recipe Image</span>
          {!preview.preview && (
            <img src={placeholder} id="placeholderImg" alt=""></img>
          )}
          {preview.preview && <img src={preview.preview} alt=""></img>}
          <label className="button" for="upload">
            Upload File
          </label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            name="foo"
            onChange={changeHandler}
          />
        </div>
        <div id="otherContainer">
          <div>
            <div id="titleWrapper">
              <span>Title</span>
              <input
                type="text"
                placeholder="enter title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div id="categoryWrapper">
              <span>Category</span>
              <select
                id="category"
                value={category}
                onChange={(event) => {
                  const typeOfFood = event.target.value;
                  setCategory(typeOfFood);
                }}
              >
                <option value="breakfast">Breakfast</option>
                <option value="brunch">Brunch</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div id="prepTimeWrapper">
              <span>Prep Time</span>
              <input
                type="number"
                placeholder="Enter prep time"
                value={prepTime}
                min="0"
                onChange={(event) => setPrepTime(event.target.value)}
              />
            </div>
            <div id="numberOfPeopleWrapper">
              <span>Number of People</span>
              <input
                type="number"
                placeholder="Enter number of people"
                min="0"
                value={numberOfPeople}
                onChange={(event) => setNumberOfPeople(event.target.value)}
              />
            </div>
          </div>
          <div id="descriptionContainer">
            <span>Description</span>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
        <div id="details">
          <span>Recipe Details</span>
          <textarea
            placeholder="Recipe Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </div>
        <button id="submitButton" type="submit">
          Post Recipe
        </button>
      </form>
    </div>
  );
};
