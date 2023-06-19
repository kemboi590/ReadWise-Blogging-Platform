import {
  getBlogs,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "./../controllers/blogController.js";

import {
  registerUser,
  loginUser,
  loginRequired,
} from "./../controllers/userController.js";
const blogs = (app) => {
  //blog routes
  app.route("/blogs").get(getBlogs).post(createBlog);
  app.route("/blogs/:id").get(getSingleBlog).put(updateBlog).delete(deleteBlog);
  //comment routes
  app.route("/comments").post(createComment); //create comment to a post

  app.route("/comments/:id").get(getComments); //get comments of a post

  app.route("/comments/:id").put(updateComment); //update comment

  //register route
  app.route("/auth/register").post(registerUser);
  //login route
  app.route("/auth/login").post(loginUser);
  //delete comment
  app.route("/comments/:id").delete(deleteComment);
};
export default blogs;
