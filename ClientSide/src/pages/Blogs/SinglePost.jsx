import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { apidomain } from "./../../utils/domain";
import { Context } from "./../../context/userContext/Context";
import { FaThumbsUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import Comments from "./Comments";
import "./SinglePost.css";

// SINGLE POST COMPONENT
function SinglePost() {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(blog?.likes || 0);
  const [liked, setLiked] = useState(false);

  //FETCH SINGLE BLOG
  const fetchSingleBlog = async () => {
    try {
      const res = await Axios.get(`${apidomain}/blogs/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      setBlog(res.data);
      // console.log(res.data);
      setLikes(res.data.Likes);
      // console.log(res.data.Likes);
    } catch (error) {
      console.log(error);
    }
  };

  // FOR LIKES
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
        // Add the like
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

  // FETCH SINGLE BLOG ON PAGE LOAD
  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  // DISPLAY LOADING IF BLOG IS NULL
  if (!blog) {
    return <div>Loading...</div>;
  }

  // RETURN SINGLE BLOG
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
          <h3 className="comment">
            <FaComment />
            <p className="textComment">Comment</p>
          </h3>

          <div className="deleteEditPost">
            <h3 className="edit">
              <BsPencilFill />
              <p className="editText">Edit</p>
            </h3>
            <h3 className="deleteComment">
              <FaTrash />
              <p className="deleteText">Delete</p>
            </h3>
          </div>
        </div>
        <div className="forComments">
          <h3 className="titleComment">comments</h3>
          <Comments />
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
