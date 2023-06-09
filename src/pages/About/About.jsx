import React from 'react'
import './about.css'
import aboutImg from '../../images/aboutUs.jpg'

function About() {
  return (
    <div className='AboutPage'>
      <h3 className='aboutTittle'>ABOUT US</h3>
      <div className="aboutImage">
        <img src={aboutImg} alt="about" />
      </div>
      <div className="aboutText">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis consequatur ipsa voluptate ex sint maxime error ab velit placeat. Explicabo fugiat similique nam repellat recusandae quis sint veritatis laboriosam praesentium!
          Magnam expedita dolores eos, odit dolor saepe voluptatem sint sit deleniti laborum corrupti? Earum, porro nulla iusto officia dicta asperiores aperiam debitis fugit hic architecto, delectus nostrum deleniti sequi ut?
          Officia dolorem assumenda distinctio quasi sunt aliquid, esse, impedit perferendis amet quos alias laudantium earum nam tempore eaque praesentium doloremque voluptatibus odit! Pariatur eos culpa labore, vitae accusantium ipsum voluptatem.
          Architecto necessitatibus, nesciunt id culpa ratione ipsam voluptate odio repellat inventore laboriosam modi quis quas facere. Illum obcaecati, odit enim in a officia consequuntur voluptates fugit debitis possimus iste tempore?
        </p>
      </div>


    </div>
  )
}

export default About