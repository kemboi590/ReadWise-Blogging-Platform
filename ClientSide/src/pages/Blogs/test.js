import React, { useRef, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { apidomain } from "./../../utils/domain";
import { Context } from "./../../context/userContext/Context";
import { FaThumbsUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";
import Comments from "./Comments";
import "./SinglePost.css";
import UpdateQuill from "./UpdateQuill";

function SinglePost() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(blog?.likes || 0);
  const [liked, setLiked] = useState(false);
  const textareaRef = useRef(null);
  const [showReactQuill, setShowReactQuill] = useState(false);
  const [tempBlogData, setTempBlogData] = useState("");

  const goBack = () => {
    navigate("/blogs");
  };

  const fetchSingleBlog = async () => {
    try {
      const res = await Axios.get(`${apidomain}/blogs/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      setBlog(res.data);
      console.log(res.data);
      setLikes(res.data.Likes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
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

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`${apidomain}/blogs/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      navigate("/blogs");
      alert(response.data);
    } catch (response) {
      alert("Oops! Something went wrong. Please try again later.");
    }
  };

  const handleEditToggle = (blog) => {
    setTempBlogData(blog);
    setShowReactQuill(!showReactQuill);
    navigate(`/updateblog/${blog.PostID}`, { state: blog });
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <div className="singleBlogPage">
        <div>
          <h2 className="SingleblogTitle">{blog.Title}</h2>
          <p className="SingleDescription">{blog.BlogDesc}</p>
          <p className="blogauthor">
            <i>Created By:</i> <b>{blog.UserName} </b> {blog.CreatedAt}
          </p>
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
            <FaComment /> {blog.comments.length}{" "}
            <p className="textComment">Comment</p>
          </h3>
        </div>
        <div>
          {user && user.username === blog.UserName && (
            <div className="adminIcons">
              <BsPencilFill
                className="edit"
                onClick={() => handleEditToggle(blog)}
              />
              <FaTrash
                className="delete"
                onClick={() => handleDelete(blog.PostID)}
              />
            </div>
          )}
        </div>
        <div>
          <div className="backButton" onClick={goBack}>
            <RiArrowGoBackFill /> Go Back
          </div>
        </div>
        <div className="commentsSection">
          <h3>Comments</h3>
          <Comments comments={blog.comments} postId={blog.PostID} />
        </div>
        <div>
          {showReactQuill && (
            <div className="createMyBlog">
              <UpdateQuill blog={tempBlogData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
