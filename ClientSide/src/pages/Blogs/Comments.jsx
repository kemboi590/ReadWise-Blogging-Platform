import React from "react";
import { useState, useEffect } from "react";
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

const schema = yup.object().shape({
  Coment: yup.string().required("comment is required"),
});

function Comments() {
  const { id } = useParams();
  const { user } = useContext(Context);

  const [commentsDetails, setCommentsDetails] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

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

  useEffect(() => {
    fetchCommentsDetails();
  }, [id]);

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

      <form onSubmit={handleSubmit(onSubmit)} className="myForm">
        <textarea
          className="inputComment"
          placeholder="Write a comment"
          {...register("Coment")}
        />

        <p className="errorcomment">{errors.comment?.message}</p>
        <button type="submit" className="sbmtComment">
          {<IoSend />}
        </button>
      </form>
    </div>
  );
}

export default Comments;
