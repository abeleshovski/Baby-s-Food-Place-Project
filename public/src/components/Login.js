import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import "../style/login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const history = useHistory();

  const url = `http://${process.env.REACT_APP_API_URL}/api/auth/login`;
  function handleSubmit(e) {
    e.preventDefault();

    fetch(url, {
      method: "post",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: email,
        password: password,
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
          cookies.set("token", data.token, { path: "/" });
          cookies.set("id", data.id, { path: "/" });
          history.push("/home");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //
  return (
    <div>
      <h1 id="loginName">Login</h1>
      <div className="login">
        <div className="loginMessage">
          <h1>
            Welcome to <span>Baby's</span>
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
        <div className="loginForm">
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              name="password"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
