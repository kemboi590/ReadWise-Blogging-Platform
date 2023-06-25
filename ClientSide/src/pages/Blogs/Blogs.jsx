import React from "react";
import "./blogs.css";
import { Link } from "react-router-dom";
import userImg from "../../images/user.png";

import { useState, useEffect, useContext } from "react";
import { Context } from "./../../context/userContext/Context";
import Axios from "axios";
import { apidomain } from "./../../utils/domain";

function Blogs() {
  const { user } = useContext(Context);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await Axios.get(`${apidomain}/blogs`, { 
      headers: {
        Authorization: `${user.token}`,
      },
    });
    setBlogs(res.data);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  console.log(blogs);
  return (
    <div className="blogsPage">
      <h2 className="blogsTitle">ReadWise Blogs</h2>
      <Link to="/createblog">
        <h4 className="create">Create a Blog</h4>
      </Link>

      <div className="allBlogs">
        {blogs &&
          blogs.map((blog, index) => {
            return (
              <Link to={`/blog/${blog.PostID}`} key={index}>
                <div className="singleBlog" key={index}>
                  <div className="introBlogs">
                    <div className="userImg">
                      <img src={userImg} alt="userImg" />
                    </div>
                    <div className="userName">
                      <p className="author">{blog.UserName}</p>
                    </div>
                    <div className="timePosted">
                      <p className="time">{blog.UpdatedAt}</p>
                    </div>
                  </div>
                  <div className="mainBlog">
                    <div className="containTitleContent">
                      <div className="blogTitle">
                        <h3 className="title">{blog.Title}</h3>
                      </div>
                      <div className="blogContent">
                        <p className="description">{blog.BlogDesc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Blogs;
