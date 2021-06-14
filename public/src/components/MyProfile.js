import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContextProvider";
import Cookies from "universal-cookie";

export function MyProfile() {
  const { loggedIn } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const cookies = new Cookies();
  const id = cookies.get("id");

  const url = `http://${process.env.REACT_APP_API_URL}/myprofile/${id}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, {
      credentials: "same-origin",
      method: "post",
      headers: {
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
          alert(data);
        }
      })
      .catch((error) => {
        console.log(error);
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
        <div>
          <h2>My Profile</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="firstName"
              type="text"
              placeholder="Please enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <input
              name="lastName"
              type="text"
              placeholder="Please enter last name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            ></input>
            <input
              name="email"
              type="email"
              placeholder="Please enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              name="DOB"
              type="date"
              placeholder="XX-XX-XXXX"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
            ></input>
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              name="passowrd"
              type="password"
              placeholder="Enter Password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            ></input>
            <button type="submit">Yeet</button>
          </form>
        </div>
      )}
    </div>
  );
}
