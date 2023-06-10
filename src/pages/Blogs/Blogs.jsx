import React from 'react'
import './blogs.css'

//import userImg from '../../images/user.png'
import userImg from '../../images/user.png'
// import blogImg from '../../images/blogImg.jpg'
import blogImg from '../../images/blogImage.jpeg'

import blogData from './blogData';

function Blogs() {
  return (
    <div className='blogsPage'>


      <h2 className='blogsTitle'>ReadWise Blogs</h2>


      <div className="allBlogs">

      {blogData.map(({ id, userImage, userName, time, title, description, blogImage }) => { 
        return (

          <div className="singleBlog" key={id} >
          <div className="introBlogs">
          <div className="userImg">
            <img src={userImage} alt="userImg" />
          </div>
          <div className="userName">
                <p className="author">{userName }</p>
          </div>
          <div className="timePosted">
                <p className="time">{time}</p>
          </div>

          </div>
          <div className="mainBlog">
            {/* contain both blog title and content */}
          <div className="containTitleContent">
            {/* blog title */}
          <div className="blogTitle">
            <h3 className="title">{title}</h3>
            </div>
            {/* blog content */}
          <div className="blogContent">
            <p className="description">
              {description}</p>
            </div>

            </div>
            {/* blog image */}
            <div className="blogImg">
              <img src={blogImage} alt="blogImg" />
              </div>
            
          </div>
        </div>
              
          
            )


          })}

      </div>
      
    </div>
  )
}

export default Blogs