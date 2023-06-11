import React from "react";
import "./about.css";
import aboutImg from "../../images/aboutUs.jpg";

function About() {
  return (
    <div className="AboutPage">
      <h3 className="aboutTittle">ABOUT US</h3>
      <div className="aboutTextImage">
        <div className="aboutText">
          <p>
            <h2 className="subTitle">ReadWise Blogging Platform</h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
            consequatur ipsa voluptate ex sint maxime error ab velit placeat.
            Explicabo fugiat similique nam repellat recusandae quis sint
            veritatis laboriosam praesentium! Magnam expedita dolores eos,{" "}
            <br /> <br />
            odit dolor saepe voluptatem sint sit deleniti laborum corrupti?
            Earum, porro nulla iusto officia dicta asperiores aperiam debitis
            fugit hic architecto, delectus nostrum deleniti sequi ut? Officia
            dolorem assumenda distinctio quasi sunt aliquid, esse,
            <ul className="aboutUl">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </p>
        </div>
        <div className="aboutImage">
          <img src={aboutImg} alt="about" />
        </div>
      </div>
    </div>
  );
}

export default About;
