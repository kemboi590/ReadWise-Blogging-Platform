import {
  getBlogs,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/postController.js";
import { loginRequired } from "../controllers/userController.js";

const blogs = (app) => {
  //blog routes
  app.route("/blogs").get(loginRequired, getBlogs).post(loginRequired, createBlog);
  app.route("/blogs/:id").get(loginRequired, getSingleBlog).put(loginRequired,updateBlog).delete(loginRequired, deleteBlog);
};

export default blogs;
