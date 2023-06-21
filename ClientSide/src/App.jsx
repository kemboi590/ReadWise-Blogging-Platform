import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// import pages and components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Blogs from "./pages/Blogs/Blogs";
import Contacts from "./pages/Contact/Contacts";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import TinyMCEEditor from "./pages/Blogs/TinyMCEEditor";
import BlogPosts from "./pages/Blogs/BlogPosts";

function App() {
  return (
    <div>
      <Router>
        {/* components */}
        <Navbar />

        <Routes>
          {/* pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/createblog" element={<TinyMCEEditor />} />
          <Route  path="/blogposts/:id"  element={<BlogPosts />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
