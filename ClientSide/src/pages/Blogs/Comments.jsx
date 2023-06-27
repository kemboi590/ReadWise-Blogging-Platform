import { useState, useEffect, useContext } from "react";
import "./comments.css";
import { IoSend } from "react-icons/io5";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { apidomain } from "../../utils/domain";
import { Context } from "./../../context/userContext/Context";
import userImg from "../../images/user.png";
import { FaTrash } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";

// COMMENTS COMPONENT
function Comments({ textareaRef }) {
  const { id } = useParams(); // id of the blog
  const { user } = useContext(Context); // user details
  const [commentsDetails, setCommentsDetails] = useState([]); // comments details

  // FETCH COMMENTSDETAILS
const fetchCommentsDetails = async () => {
  try {
    const response = await Axios.get(`${apidomain}/comments/${id}`, {
      headers: {
        Authorization: `${user.token}`,
      },
    });
    if (Array.isArray(response.data)) {
      setCommentsDetails(response.data);
    } else {
      // Handle unexpected response data type
      console.error('Invalid comments data:', response.data);
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};
    // FETCH COMMENTSDETAILS ON PAGE LOAD
    useEffect(() => {
      fetchCommentsDetails();
    }, []);
  console.log(commentsDetails)


  // ON SUBMIT OF COMMENT POST REQUEST
  const handleSubmit = (e) => {
    // check if comment is empty
    if (e.target.Coment.value === "") {
      e.preventDefault();
      alert("Comment cannot be empty");
    } else {
      e.preventDefault();
      const comment = e.target.Coment.value;
      const data = {
        Coment: comment,
      };

      Axios.post(`${apidomain}/comments/${id}`, data, {
        headers: {
          Authorization: `${user.token}`,
        },
      })
        .then((response) => {
          console.log(response);
          fetchCommentsDetails();
          e.target.reset();
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };



  // DELETE COMMENT
  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`${apidomain}/comments/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      fetchCommentsDetails();
      alert(response.data);
    } catch (response) {
      alert("Ops! Something went wrong. Please try again la");
    }
  };

  // RETURN
  return (
    <div className="commentsPage">
      <div className="wrapper">
        {commentsDetails
          ? commentsDetails.map((comment, index) => {
              return (
                <div className="commentCard" key={index}>
                  <div className="upperWrapper">
                    <div className="commentImg">
                      <img src={userImg} alt="image" />
                    </div>
                    <p className="userComment"> {comment.UserName} </p>
                    <p className="timeComment"> {comment.CreatedAt} </p>
                  </div>
                  <p className="comment"> {comment.Coment} </p>
                  <div className="EditDelete">
                    <h4 className="edit">
                      <BsPencilFill />
                      <p className="editText">Edit</p>
                    </h4>
                    <h4 className="deleteComment">
                      <FaTrash
                        onClick={() => handleDelete(comment.CommentID)}
                      />
                      <p className="deleteText">Delete</p>
                    </h4>
                  </div>
                </div>
              );
            })
          : null}
      </div>

      {/* FORM  */}
      <form onSubmit={handleSubmit} className="myFormComments">
        <textarea
          className="inputComment"
          placeholder="Write a comment"
          name="Coment"
          ref={textareaRef}
        />

        <button type="submit" className="sbmtComment">
          {<IoSend />}
        </button>
      </form>
    </div>
  );
}

export default Comments;
