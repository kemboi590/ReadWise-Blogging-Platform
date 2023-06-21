import React from "react";
import { useLocation } from "react-router-dom";
import "./posts.css";
function BlogPosts() {
  const location = useLocation();
  const blog = location.state?.blog;

  if (!blog) {
    return null; // or handle the case when the blog is not found
  }

  return (
    <div className="blogPostPage">
      <div className="blogInfo">
        <div className="userImg">
          <img src={blog.userImage} alt="userImg" />
        </div>

        <p className="author">{blog.userName}</p>

        <p className="blogTime">{blog.time}</p>
      </div>
      <h2 className="blogTitle">{blog.title}</h2>
      <div className="blogdescription">
        <p>{blog.description}</p>
      </div>
      <div className="blogImage">
        <img src={blog.blogImage} alt="blogImg" />
      </div>

      {/* <div className="blogContent">
        <p>{blog.content}</p>
          </div> */}
      <div
        className="blogContent"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
}

export default BlogPosts;
