import React, { useState, useEffect, useContext } from "react";
import "./comments.css";
import { IoSend } from "react-icons/io5";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { apidomain } from "../../utils/domain";
import { Context } from "./../../context/userContext/Context";
import userImg from "../../images/user.png";
import { FaTrash } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import UpdateComment from "./UpdateComment";

// COMMENTS COMPONENT
function Comments({ textareaRef }) {
  const { id } = useParams(); // id of the blog
  const { user } = useContext(Context); // user details
  
  const [commentsDetails, setCommentsDetails] = useState([]); // comments details
  const [showEditForm, setShowEditForm] = useState({}); // show edit form
  const [tempComment, setTempComment] = useState([]); // temp comment

  // FETCH COMMENTSDETAILS
  const fetchCommentsDetails = async () => {
    try {
      const response = await Axios.get(`${apidomain}/comments/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });

      setCommentsDetails(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchCommentsDetails();
  }, []);
  //console.log(commentsDetails);

  // ON SUBMIT OF COMMENT POST REQUEST
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if comment is empty
    if (e.target.Coment.value === "") {
      alert("Comment cannot be empty");
      return;
    }

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
        // console.log(response);      //REVISIT
        fetchCommentsDetails();
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
      });
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
    } catch (error) {
      alert("Oops! Something went wrong. Please try again.");
    }
  };

  // EDIT COMMENT
  const handleCommentToggle = (comment) => {
    setShowEditForm((prevState) => ({
      ...prevState,
      [comment.CommentID]: !prevState[comment.CommentID],
    }));
    setTempComment(comment);
  };

  // RENDER
  return (
    <div className="commentsPage">
      <div className="wrapper">
        {/* MAP */}
        {commentsDetails &&
          commentsDetails.map((comment, index) => (
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
                  {
                    user && user.UserID === comment.UserID ? (
                      <>
                        <BsPencilFill onClick={() => handleCommentToggle(comment)} />
                        <p className="editText">Edit</p>
                      </>
                    ) : null
                  }
                  {showEditForm[comment.CommentID] && (
                    <UpdateComment
                      comment={tempComment}
                      fetchCommentsDetails={fetchCommentsDetails}
                    />
                  )}
                </h4>
                <h4 className="deleteComment">
                  {user && user.UserID === comment.UserID ? (
                    <>
                      <FaTrash
                        onClick={() => handleDelete(comment.CommentID)}
                      />
                      <p className="deleteText">Delete</p>
                    </>
                  ) : null}
                </h4>
              </div>
            </div>
          ))}
      </div>

      {/* COMMENT FORM */}
      <form onSubmit={handleSubmit} className="myFormComments">
        <textarea
          className="inputComment"
          placeholder="Write a comment"
          name="Coment"
          ref={textareaRef}
        />

        <button type="submit" className="sbmtComment">
          <IoSend />
        </button>
      </form>
    </div>
  );
}

export default Comments;
