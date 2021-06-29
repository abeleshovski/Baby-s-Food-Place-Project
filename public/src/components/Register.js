import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../style/register.css";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  let history = useHistory();

  const url = `http://${process.env.REACT_APP_API_URL}/api/auth/register`;

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
          alert("User Registered");
          history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 id="registerName">Register</h1>
      <div className="register">
        <div className="registerMessage">
          <h1>
            Create your <span>Account</span>
          </h1>
          <p>
            The purpose of lorem ipsum is to create a natural looking block of
            text (sentence, paragraph, page, etc.) that doesn't distract from
            the layout. A practice not without controversy, laying out pages
            with meaningless filler text can be very useful when the focus is
            meant to be on design, not content. The passage experienced a surge
            in popularity during the 1960s when Letraset used it on their
            dry-transfer sheets, and again during the 90s as desktop publishers
            bundled the text with their software. Today it's seen all around the
            web; on templates, websites, and stock designs. Use our generator to
            get your own, or read on for the authoritative history of lorem
            ipsum.
          </p>
        </div>
        <div className="registerForm">
          <form onSubmit={handleSubmit}>
            <div>
              <label for="firstName">First Name</label>
              <br />
              <input
                name="firstName"
                type="text"
                placeholder="Please enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div>
              <label for="lastName">Last Name</label>
              <br />
              <input
                name="lastName"
                type="text"
                placeholder="Please enter last name"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              ></input>
            </div>
            <div>
              <label for="email">Email</label>
              <br />
              <input
                name="email"
                type="email"
                placeholder="Please enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label for="DOB">Date of Birth</label>
              <br />
              <input
                min="1930-01-01"
                max="2014-01-01"
                name="DOB"
                type="date"
                placeholder="XX-XX-XXXX"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              ></input>
            </div>
            <div>
              <label for="password">Password</label>
              <br />
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label for="conf_password">Confirm Password</label>
              <br />
              <input
                name="conf_password"
                type="password"
                placeholder="Enter Password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              ></input>
            </div>
            <button type="submit" id="registerBtn">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
