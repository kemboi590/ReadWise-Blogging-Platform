import React from "react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./comments.css";
import { IoSend } from "react-icons/io5";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { apidomain } from "../../utils/domain";
import { useContext } from "react";
import { Context } from "./../../context/userContext/Context";
import userImg from "../../images/user.png";

// SCHEMA FOR VALIDATION
const schema = yup.object().shape({
  Coment: yup.string().required("comment is required"),
});

// COMMENTS COMPONENT
function Comments({ textareaRef }) {
  const { id } = useParams(); // id of the blog
  const { user } = useContext(Context); // user details
  const [commentsDetails, setCommentsDetails] = useState([]); // comments details

  // FORM VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // FETCH COMMENTSDETAILS
  const fetchCommentsDetails = async () => {
    try {
      const res = await Axios.get(`${apidomain}/comments/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      setCommentsDetails(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ON SUBMIT OF COMMENT POST REQUEST
  const onSubmit = (data) => {
    Axios.post(`${apidomain}/comments/${id}`, data, {
      headers: {
        Authorization: `${user.token}`,
      },
    })
      .then((response) => {
        console.log(response);
        fetchCommentsDetails();
      })
      .catch((response) => {
        console.log(response);
      });

    reset();
  };

  // FETCH COMMENTSDETAILS ON PAGE LOAD
  useEffect(() => {
    fetchCommentsDetails();
  }, [id]);

  // RETURN
  return (
    <div className="commentsPage">
      <div className="wrapper">
        {commentsDetails.map((comment, index) => (
          <div className="commentCard" key={index}>
            <div className="upperWrapper">
              <div className="commentImg">
                <img src={userImg} alt="image" />
              </div>
              <p className="userComment"> {comment.UserName} </p>
              <p className="timeComment"> {comment.CreatedAt} </p>
            </div>

            <p className="comment"> {comment.Coment} </p>
          </div>
        ))}
      </div>

      {/* FORM  */}
      <form onSubmit={handleSubmit(onSubmit)} className="myFormComments">
        <textarea
          ref={textareaRef}
          className="inputComment"
          placeholder="Write a comment"
          {...register("Coment")}
        />

        <p className="errorcomment">{errors.Coment?.message}</p>
        <button type="submit" className="sbmtComment">
          {<IoSend />}
        </button>
      </form>
    </div>
  );
}

export default Comments;
