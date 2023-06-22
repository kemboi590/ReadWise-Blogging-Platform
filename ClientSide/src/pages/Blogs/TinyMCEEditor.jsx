import React, { useState } from "react";
import "./TinyMCEEditor.css";
import { Editor } from "@tinymce/tinymce-react";

function TinyMCEEditor() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");

  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  const handleTitleChange = (e) => {
    setBlogTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setBlogDescription(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Submit clicked");
    console.log("Title:", blogTitle);
    console.log("Description:", blogDescription);
  };

  return (
    <div className="EditorContainer">
      <h2 className="titleToWriteBlog">
        Educate through Writing, Unleash the Power of Your Words
      </h2>
      <div className="bothTitleDescr">
        <div className="form-field">
          <label htmlFor="blogTitle">Give a Title for your Blog:</label>
          <input
            type="text"
            id="blogTitle"
            value={blogTitle}
            onChange={handleTitleChange}
            className="titleBlog"
          />
        </div>
        <div className="form-field">
          <label htmlFor="blogDescription">
            Give a short Description about your Blog:
          </label>
          <input
            id="blogDescription"
            value={blogDescription}
            onChange={handleDescriptionChange}
            className="textDesc"
          />
        </div>
      </div>

      <Editor
        apiKey="6ysspo305d6uqauwzwnfy7ormdyq073g8jpw0gohu2a3m2gp"
        initialValue="<p></p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={handleEditorChange}
      />
      <button onClick={handleSubmit} className="publish">
        Publish
      </button>
    </div>
  );
}

export default TinyMCEEditor;
