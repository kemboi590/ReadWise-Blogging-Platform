import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Axios from "axios";
import "./TinyMCEEditor.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/userContext/Context";

function MyComponent() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [BlogDesc, setDescription] = useState("");
  const Content = useRef(null);

  const handleEditorChange = (content) => {
    // Handle editor content change
  };

  const handleClick = () => {
    const editorContent = Content.current.editor.getContent({
      format: "text",
    });

    if (!Title || !BlogDesc || !editorContent.trim()) {
      alert("Please enter all required fields");
      return;
    }

    const mydata = {
      Title,
      BlogDesc,
      Content: editorContent.trim(),
    };

    console.log(mydata);

    Axios.post("http://localhost:8081/blogs", mydata)
      .then((response) => {
        console.log(response);
        alert(response.data);
        navigate("/blogs");
      })

      .catch((response) => {
        console.log(response);
        alert("Please try again later");
      });
  };

  return (
    <div className="createMyBlog">
      {/* check if user is logged in */}
      {!user ? navigate("/login") : null}

      <label htmlFor="Title" className="name">
        Give a Title to your Blog
      </label>
      <input
        type="text"
        id="title"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="BlogDesc" className="name">
        Give a Description to your Blog
      </label>
      <input
        type="text"
        id="description"
        value={BlogDesc}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="myEditor">
        <Editor
          init={{
            height: 900,
          }}
          apiKey="6ysspo305d6uqauwzwnfy7ormdyq073g8jpw0gohu2a3m2gp"
          onEditorChange={handleEditorChange}
          ref={Content}
        />
      </div>

      <button onClick={handleClick} className="sbtBtb">
        Submit
      </button>
    </div>
  );
}

export default MyComponent;
