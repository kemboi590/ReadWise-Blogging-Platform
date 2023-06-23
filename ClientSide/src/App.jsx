import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// import  components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// import pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Blogs from "./pages/Blogs/Blogs";
import Contacts from "./pages/Contact/Contacts";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import QuillEditor from "./pages/Blogs/QuillEditor";
import BlogPosts from "./pages/Blogs/BlogPosts";
import Profile from "./pages/profile/Profile";
import Logout from "./pages/Logout/Logout";

// import context
import { useContext } from "react";
import { Context } from "./context/userContext/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <div>
      <Router>
        {/* components */}
        <Navbar />

        <Routes>
          {/* pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={user ? <Blogs /> : <Login />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/createblog" element={<QuillEditor />} />
          <Route path="/blogposts/:id" element={<BlogPosts />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
