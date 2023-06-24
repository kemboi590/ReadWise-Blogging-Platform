import React from "react";
import userImg from "../../images/user.png";

import "./posts.css";

function BlogPosts() {


  return (
    <div className="blogPostPage">
      <div className="blogInfo">
        <div className="userImg">
          <img src={userImg} alt="userImg" />
        </div>

        <p className="author">John Doe</p>

        <p className="blogTime">2 hours ago</p>
      </div>
      <h2 className="blogTitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        voluptatum.
      </h2>
      <div className="blogdescription">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum.
        </p>
      </div>
      <div className="blogImage">
        <img src={blogImg} alt="blogImg" />
      </div>

  
    </div>
  );
}

export default BlogPosts;
