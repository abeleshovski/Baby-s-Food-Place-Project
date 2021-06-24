const config = require("../../config/index");
const express = require("express");
const proxy = require("express-http-proxy");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(
  "/api/auth",
  proxy(`http://localhost:${config.get("ports").auth}`, {
    proxyReqPathResolver: (req) => {
      return `http://localhost:${config.get("ports").auth}/api/auth${req.url}`;
    },
  })
);
app.use(
  "/api/recipes",
  proxy(`http://localhost:${config.get("ports").recipes}`, {
    proxyReqPathResolver: (req) => {
      return `http://localhost:${config.get("ports").recipes}/api/recipes${
        req.url
      }`;
    },
  })
);

app.use(
  "/api/misc",
  proxy(`http://localhost:${config.get("ports").misc}`, {
    proxyReqPathResolver: (req) => {
      return `http://localhost:${config.get("ports").misc}/api/misc${req.url}`;
    },
  })
);

app.use(
  "/api/storage",
  proxy(`http://localhost:${config.get("ports").storage}`, {
    proxyReqPathResolver: (req) => {
      return `http://localhost:${config.get("ports").storage}/api/storage${
        req.url
      }`;
    },
  })
);

app.use("/", express.static(`${__dirname}/../../public/build`));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT || config.get("ports").proxy;
app.listen(PORT, (err) => {
  if (err) {
    return console.log("Could not start proxy service", err);
  }
  console.log(`Proxy service successfully started ${PORT}`);
});
