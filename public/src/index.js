import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import "./style/index.css";

require("dotenv").config();

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App}></Route>
  </BrowserRouter>,
  document.getElementById("root")
);
