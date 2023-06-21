import React from "react";
import "./blogs.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import blogData from "./blogData";

function Blogs() {
  const navigate = useNavigate();

  const handleBlogClick = (id) => {
    const blog = blogData.find((blog) => blog.id === id);
    if (blog) {
      navigate(`/blogposts/${id}`, { state: { blog } });
    }
  };
  

  return (
    <div className="blogsPage">
      <h2 className="blogsTitle">ReadWise Blogs</h2>
      <Link to="/createblog">
        <h4 className="create">Create a Blog</h4>
      </Link>
      <div className="allBlogs">
        {blogData.map(
          ({ id, userImage, userName, time, title, description, blogImage }) => (
            <div
              className="singleBlog"
              key={id}
              onClick={() => handleBlogClick(id)}
            >
              <div className="introBlogs">
                <div className="userImg">
                  <img src={userImage} alt="userImg" />
                </div>
                <div className="userName">
                  <p className="author">{userName}</p>
                </div>
                <div className="timePosted">
                  <p className="time">{time}</p>
                </div>
              </div>
              <div className="mainBlog">
                <div className="containTitleContent">
                  <div className="blogTitle">
                    <h3 className="title">{title}</h3>
                  </div>
                  <div className="blogContent">
                    <p className="description">{description}</p>
                  </div>
                </div>
                <div className="blogImg">
                  <img src={blogImage} alt="blogImg" />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Blogs;
