import {
  getBlogs,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "./../controllers/blogController.js";

import {
  registerUser,
  loginUser,
  loginRequired,
} from "./../controllers/userController.js";
const blogs = (app) => {
  //get and post request for /blogs endpoint
  app.route("/blogs").get(loginRequired, getBlogs).post(createBlog);
  //get, put and delete request for /blogs/:id endpoint
  app
    .route("/blogs/:id")
    .get(loginRequired, getSingleBlog)
    .put(updateBlog)
    .delete(deleteBlog);

  //register route
  app.route("/auth/register").post(registerUser);
  //login route
  app.route("/auth/login").post(loginUser);
};
export default blogs;
