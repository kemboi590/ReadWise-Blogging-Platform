import { getLikes, createLike } from "../controllers/likesController.js";

const likes = (app) => {
  //likes routes
  app.route("/likes").get(getLikes);
  app.route("/likes/:id").put(createLike);
};

export default likes;
