import {
  getBlogs,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/postController.js";

const blogs = (app) => {
  //blog routes
  app.route("/blogs").get(getBlogs).post(createBlog);
  app.route("/blogs/:id").get(getSingleBlog).put(updateBlog).delete(deleteBlog);
};

export default blogs;
