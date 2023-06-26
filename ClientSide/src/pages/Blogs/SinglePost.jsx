import React, { useRef, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { apidomain } from "./../../utils/domain";
import { Context } from "./../../context/userContext/Context";
import { FaThumbsUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import Comments from "./Comments";
// import css
import "./SinglePost.css";

function SinglePost() {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(blog?.likes || 0);
  const [liked, setLiked] = useState(false);
  const textareaRef = useRef(null);

  const fetchSingleBlog = async () => {
    try {
      const res = await Axios.get(`${apidomain}/blogs/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      setBlog(res.data);
      // console.log(res.data);
      // console.log(res);
      setLikes(res.data.Likes); //revisit
      // console.log(res.data.Likes);
    } catch (error) {
      console.log(error);
    }
  };
  //revisit
  const handleLike = async () => {
    try {
      if (liked) {
        // Remove the like
        await Axios.delete(`${apidomain}/likes/${id}`, {
          headers: {
            Authorization: `${user.token}`,
          },
        });
        setLikes(likes - 1);
        setLiked(false);
      } else {
        await Axios.put(`${apidomain}/likes/${id}`, null, {
          headers: {
            Authorization: `${user.token}`,
          },
        });
        setLikes(likes + 1);
        setLiked(true);
        console.log(likes + 1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCommentIconClick = () => {
    textareaRef.current.focus();
  };

  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <div className="singleBlogPage">
        <div>
          <h2 className="SingleblogTitle">{blog.Title}</h2>
          <p className="SingleDescription">{blog.BlogDesc}</p>
        </div>
        <div>
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: blog.Content }}
          ></p>
        </div>
        <div className="LikeComment">
          <h3 className="like" onClick={handleLike}>
            <FaThumbsUp /> {likes} <p className="textLike">Like</p>
          </h3>
          <h3 className="comment" onClick={handleCommentIconClick}>
            <FaComment /> <p className="textComment">Comment</p>
          </h3>
        </div>
        <div className="forComments">
          <Comments textareaRef={textareaRef} postId={id} />
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
