import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";

import { loginRequired } from "../controllers/userController.js";
const comments = (app) => {
  //comment routes

  app.route("/comments/:id").post(loginRequired, createComment); //create comment to a post

  app.route("/comments/:id").get(loginRequired,getComments); //get comments of a post

  app.route("/comments/:id").put(loginRequired, updateComment); //update comment

  app.route("/comments/:id").delete(loginRequired, deleteComment); //delete comment
};
export default comments;
