import {
  getLikes,
  createLike,
  deleteLike,
} from "../controllers/likesController.js";

const likes = (app) => {
  //likes routes
  app.route("/likes").get(getLikes);
  app.route("/likes/:id").put(createLike).delete(deleteLike);
};

export default likes;
