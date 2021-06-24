import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContextProvider";
import Cookies from "universal-cookie";
import axios from "axios";
import placeholder from "../assets/images/avatar.png";
import "../style/myProfile.css";
import { useHistory } from "react-router-dom";

export function MyProfile() {
  const { loggedIn } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [preview, setPreview] = useState({ preview: "" });
  const [selectedFile, setSelectedFile] = useState();

  const history = useHistory();

  const cookies = new Cookies();
  const id = cookies.get("id");
  const token = cookies.get("token");

  const fetchUrl = `http://${process.env.REACT_APP_API_URL}/api/recipes/users/${id}`;
  const updateUrl = `http://${process.env.REACT_APP_API_URL}/api/recipes/update/${id}`;
  const fetchAvatarUrl = `http://${process.env.REACT_APP_API_URL}/api/misc/getAvatar`;
  const postAvatarUrl = `http://${process.env.REACT_APP_API_URL}/api/storage/postAvatar`;

  useEffect(() => {
    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFirstName(data.user.firstName);
        setlastName(data.user.lastName);
        setEmail(data.user.email);
        setDOB(data.user.DOB.slice(0, 10));
        if (data.user.avatar) {
          const imageUrl = `${fetchAvatarUrl}/${data.user.avatar}`;
          setPreview({ preview: imageUrl });
        }
      })
      .catch((err) => console.error(err));
  }, []);

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
      .post(postAvatarUrl, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        console.log({ data });
        fetch(updateUrl, {
          credentials: "same-origin",
          method: "post",
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          //make sure to serialize your JSON body
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            DOB: dob,
            password: password,
            confirmation_password: confPassword,
            avatar: data.fileName,
          }),
        })
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((data) => {
            if (data.error) {
              alert(data.message);
            } else {
              alert("User Updated");
              console.log(data);
              history.push("/home");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  return (
    <div id="profile">
      {!loggedIn && (
        <div>
          <h2>You arent logged in</h2>
        </div>
      )}
      {loggedIn && (
        <div id="myprofile">
          <h1>My Profile</h1>
          <form onSubmit={handleSubmit}>
            <div id="avatarContainer">
              {!preview.preview && (
                <img src={placeholder} id="avatarImg" alt=""></img>
              )}
              {preview.preview && (
                <img src={preview.preview} id="avatarImg" alt=""></img>
              )}
              <label className="button" id="labelBtn" for="upload">
                Upload File
              </label>
              <input
                id="upload"
                type="file"
                className="button"
                accept="image/*"
                name="image"
                onChange={changeHandler}
              />
            </div>
            <div id="formContainer">
              <div id="formGrid">
                <div>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Please enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Please enter last name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Please enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Date of Birth</label>
                  <input
                    name="DOB"
                    type="date"
                    placeholder="XX-XX-XXXX"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Confirm Password</label>
                  <input
                    name="conf_password"
                    type="password"
                    placeholder="Enter Password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>

            <button id="updateBtn" type="submit">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
