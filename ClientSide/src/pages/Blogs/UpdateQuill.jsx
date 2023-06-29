import { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/userContext/Context";
import Axios from "axios";
import { apidomain } from "../../utils/domain";
import "./updateQuill.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function UpdateQuill({ blog, setShowReactQuill }) {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [Title, setTitle] = useState(blog.Title);
  const [BlogDesc, setDescription] = useState(blog.BlogDesc);
  const [Content, setContent] = useState(blog.Content);

  const handleEditorChange = (content) => {
    setContent(content);
  };

  // ON CLICKING UPDATE BTN
  const handleClick = () => {
    if (!Title || !BlogDesc || !Content.trim()) {
      alert("Please enter all required fields");
      return;
    }

    const mydata = {
      Title,
      BlogDesc,
      Content: Content.trim(),
    };

    // UPDATE
    Axios.put(`${apidomain}/blogs/${blog.PostID}`, mydata, {
      headers: {
        Authorization: `${user.token}`,
      },
    })
      .then((response) => {
        // console.log(response);
        alert(response.data);
        navigate("/blogs");
      })
      .catch((error) => {
        console.log(error);
        alert("Please try again later");
      });
  };

  // RETUN UPDATED BLOG
  return (
    <div className="updateMyBlog">
      {!user ? navigate("/login") : null}

      <h2 className="edityourblog">Edit Your Blog</h2>
      {/* FOR TITLE */}
      <label htmlFor="Title" className="name">
        Give a Title to your Blog
      </label>

      <input
        type="text"
        id="title"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* FOR DESC */}
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
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={Content}
          onChange={handleEditorChange}
        />
      </div>

      <div className="wrapBTN">
        {/* set show to false */}
        <button className="closeBtn" onClick={() => setShowReactQuill(false)}>
          Close
        </button>
        <button onClick={handleClick} className="sbtBtb">
          Update
        </button>
      </div>
    </div>
  );
}

export default UpdateQuill;
// great
