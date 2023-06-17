import express from "express";
import config from "./src/db/config.js";
import blogs from "./src/routes/routes.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//JWT middleware
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwt_secret,
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

blogs(app);

app.listen(config.port, () => {
  console.log(`Server running at ${config.url}`);
});
