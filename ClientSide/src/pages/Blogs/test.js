import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./../../context/userContext/Context";
import Axios from "axios";
import { apidomain } from "./../../utils/domain";
import "./blogs.css";

function SingleBlog({ blogId }) {
  const { user } = useContext(Context);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await Axios.get(`${apidomain}/blogs/${blogId}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      setBlog(res.data);
    };

    fetchBlog();
  }, [blogId, user.token]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const { UserName, UpdatedAt, Title, BlogDesc, Content } = blog;

  return (
    <div className="blogPostPage">
      <div className="blogInfo">
        <div className="userImg">
          <img src={userImg} alt="userImg" />
        </div>
        <p className="author">{UserName}</p>
        <p className="blogTime">{UpdatedAt}</p>
      </div>
      <h2 className="blogTitle">{Title}</h2>
      <div className="blogdescription">
        <p>{BlogDesc}</p>
      </div>
      <div className="blogContent">
        <p dangerouslySetInnerHTML={{ __html: Content }}></p>
      </div>
    </div>
  );
}

function Blogs() {
  const { user } = useContext(Context);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await Axios.get(`${apidomain}/blogs`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      setBlogs(res.data);
    };

    fetchBlogs();
  }, [user.token]);

  return (
    <div className="blogsPage">
      <h2 className="blogsTitle">ReadWise Blogs</h2>
      <Link to="/createblog">
        <h4 className="create">Create a Blog</h4>
      </Link>
      <div className="allBlogs">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <div className="singleBlog">
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
        ))}
      </div>
    </div>
  );
}

export default Blogs;
