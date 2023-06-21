import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";

const comments = (app) => {
  //comment routes

  app.route("/comments").post(createComment); //create comment to a post

  app.route("/comments/:id").get(getComments); //get comments of a post

  app.route("/comments/:id").put(updateComment); //update comment

  app.route("/comments/:id").delete(deleteComment); //delete comment
};
export default comments;
