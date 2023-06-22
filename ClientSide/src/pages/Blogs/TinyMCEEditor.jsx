import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function MyComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    // Handle editor content change
  };

  const handleClick = () => {
    const editorContent = editorRef.current.editor.getContent({ format: 'text' });
  
    // Log the values
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Editor Content:", editorContent.trim());
  };
  
  

  return (
    <div>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Editor
        apiKey="6ysspo305d6uqauwzwnfy7ormdyq073g8jpw0gohu2a3m2gp"
        onEditorChange={handleEditorChange}
        ref={editorRef}
      />

      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default MyComponent;
