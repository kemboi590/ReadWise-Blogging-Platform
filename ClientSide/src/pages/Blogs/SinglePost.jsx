import { useRef, useState, useEffect, useContext } from "react";
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

// SINGLE POST COMPONENT
function SinglePost() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [likes, setLikes] = useState(blog?.likes || 0);
  const [liked, setLiked] = useState(false);
  const textareaRef = useRef(null);
  const [showReactQuill, setShowReactQuill] = useState(false);

  // GO BACK
  const goBack = () => {
    navigate("/blogs");
  };

  // FETCH SINGLE BLOG
  const fetchSingleBlog = async () => {
    try {
      const res = await Axios.get(`${apidomain}/blogs/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      setBlog(res.data);
      setLikes(res.data.Likes);
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // GIVE FOCUS TO TEXTAREA
  const handleCommentIconClick = () => {
    textareaRef.current.focus();
  };

  // FETCH SINGLE BLOG ON PAGE LOAD
  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  // DELETE POST
  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`${apidomain}/blogs/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      navigate("/blogs");
      alert(response.data);
    } catch (error) {
      alert("Oops! Something went wrong. Please try again later.");
    }
  };

  // EDIT POST
  const handleEditToggle = () => {
    setShowReactQuill(!showReactQuill);
  };

  // RETURN SINGLE BLOG
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
            <FaComment />
            <p className="textComment">Comment</p>
          </h3>

          {/* DELETE & EDIT */}
          <div className="deleteEditPost">
            <h3 className="back" onClick={goBack}>
              <RiArrowGoBackFill className="backIcon" />
              <p className="ptag">Back</p>
            </h3>
            <h3 className="edit">
              <BsPencilFill onClick={() => handleEditToggle(blog)} />
              <p className="ptag">Edit</p>
            </h3>

    
            <h3 className="deleteComment">
              <FaTrash onClick={() => handleDelete(blog.PostID)} />
              <p className="ptag">Delete</p>
            </h3>
          </div>
        </div>
                              {/* UPDATE BLOG */}
        <div>
        {showReactQuill && <UpdateQuill blog={blog} setShowReactQuill={setShowReactQuill} />}
        </div>
        <div className="forComments">
          <h3 className="titleComment">comments</h3>
          {blog && <Comments textareaRef={textareaRef} />}
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
// greate
