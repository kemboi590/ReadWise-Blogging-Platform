import {
  getLikes,
  createLike,
  deleteLike,
} from "../controllers/likesController.js";

import { loginRequired } from "../controllers/userController.js";

const likes = (app) => {
  //likes routes
  app.route("/likes").get(loginRequired, getLikes);
  app.route("/likes/:id").put(loginRequired,createLike).delete(loginRequired,deleteLike);
};

export default likes;
