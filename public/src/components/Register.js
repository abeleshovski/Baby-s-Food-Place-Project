import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  let history = useHistory();

  const url = `http://${process.env.REACT_APP_API_URL}/auth/register`;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "post",
      headers: {
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
        // alert('User Registered')
        if (data.error) {
          alert(data.message);
        } else {
          history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
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
  );
}
