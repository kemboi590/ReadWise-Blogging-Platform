import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { apidomain } from "./../../utils/domain";
import { Context } from "./../../context/userContext/Context";

function SinglePost() {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchSingleBlog = async () => {
    try {
      const res = await Axios.get(`${apidomain}/blogs/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      setBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="singleBlogPage">
      <h2 className="blogTitle">{blog.Title}</h2>
      <div className="blogContent">
        <p className="description">{blog.BlogDesc}</p>
        <p
          className="content"
          dangerouslySetInnerHTML={{ __html: blog.Content }}
        ></p>
      </div>
    </div>
  );
}

export default SinglePost;
