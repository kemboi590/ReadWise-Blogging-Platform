import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../../context/userContext/Context";
import Axios from "axios";
import { apidomain } from "../../utils/domain";
import "./quillEditor.css";

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

function UpdateQuill({ blog }) {
  
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [BlogDesc, setDescription] = useState("");
  const [Content, setContent] = useState("");

  // const [Title, setTitle] = useState(blog.Title);
  // const [BlogDesc, setDescription] = useState(blog.BlogDesc);
  // const [Content, setContent] = useState(blog.Content);
  // useEffect(() => {
  //   if (blog) {
  //     setTitle(blog.Title);
  //     setDescription(blog.BlogDesc);
  //     setContent(blog.Content);
  //   }
  // }, [blog]);
  useEffect(() => {
    if (blog) {
      setTitle(blog.Title);
      setDescription(blog.BlogDesc);
      setContent(blog.Content);
    }
  }, [blog]);
  

  const handleEditorChange = (content) => {
    setContent(content);
  };

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

    Axios.put(`${apidomain}/blogs/${blog.PostID}`, mydata, {
      headers: {
        Authorization: `${user.token}`,
      },
    })
      .then((response) => {
        console.log(response);
        alert(response.data);
        navigate("/blogs");
      })
      .catch((error) => {
        console.log(error);
        alert("Please try again later");
      });
  };

  return (
    <div className="createMyBlog">
      {!user ? navigate("/login") : null}

      <label htmlFor="Title" className="name">
        Give a Title to your Blog
      </label>
      <input
        type="text"
        id="title"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
        // onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="BlogDesc" className="name">
        Give a Description to your Blog
      </label>
      <input
        type="text"
        id="description"
        value={BlogDesc}
        onChange={(e) => setDescription(e.target.value)}
        // onChange={(e) => setDescription(e.target.value)}
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

      <button onClick={handleClick} className="sbtBtb">
        Submit
      </button>
    </div>
  );
}

export default UpdateQuill;
