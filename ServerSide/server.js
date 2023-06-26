import express from "express";
import config from "./src/db/config.js";
import jwt from "jsonwebtoken";
//import cors
import cors from "cors";

//importing routes
import blogs from "./src/routes/postRoute.js";
import user from "./src/routes/userRoute.js";
import bodyParser from "body-parser";
import comments from "./src/routes/CommentsRoute.js";
import likes from "./src/routes/LikesRoute.js";

//invoke express
const app = express();

//built inmiddleware
app.use(cors());
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

//allow routes access express
blogs(app);
user(app);
likes(app);
comments(app);

//
app.get("/", (req, res) => {
  res.send("Welcome to ReadWise Blogging API");
});

//port
app.listen(config.port, () => {
  console.log(`Server running at ${config.url}`);
});
