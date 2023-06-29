import "./contact.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { ImFacebook2 } from "react-icons/im";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

// import contactgit image
import conactImg from "../../images/contactgif.gif";

const schema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  message: yup.string().required("Message is required"),
});

const Contacts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const sendDataToServer = (data) => {
    alert("message send successfully🥳");
    console.log(data);
    reset();
  };

  return (
    <div className="ContactPage">
      {/* Contact Title */}
      <h2 className="contactTitle">CONTACT US</h2>

      {/* Contact Form */}
      <div className="forFormGif">
        {/* Contact Gif */}
        <div className="contactGif">
          <img src={conactImg} alt="conactImg" />
        </div>

        <div className="Form">
          {/* contact form */}
          <form onSubmit={handleSubmit(sendDataToServer)} className="myForm">
            <>
              <input
                className="inputField"
                type="text"
                placeholder="Your full name"
                {...register("fullname")}
              />
              <p>{errors.fullname?.message}</p>
            </>
            <>
              <input
                className="inputField"
                type="email"
                placeholder="Your email"
                {...register("email")}
              />
              <p>{errors.email?.message}</p>
            </>
            <>
              <textarea
                placeholder="Your message"
                {...register("message")}
                className="myTextArea"
              />
              <p> {errors.message?.message} </p>
            </>
            <input type="submit" value="submit" className="submitbtn" />
          </form>
        </div>
      </div>

      <div className="contactInfo">
        <div className="item">
          <ul>
            <li>How To Find Us</li>
            <li>Kirinyaga University,Kutus</li>
            <li>Kerugoya,Kenya</li>
            <li>Phone: +254 712 345 678</li>
            <li>P.O BOX 143-10300 Kerugoya</li>
            <li>Email: hello@blogwise.com </li>
          </ul>
        </div>

        <div className="item">
          <ul>
            <li>Opening Hours</li>
            <li>Monday - Friday: 8:00am - 5:00pm</li>
            <li>Saturday: 9:00am - 4:00pm</li>
            <li>Sunday: Closed</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="item">
          <ul>
            <li>Follow Us</li>
            <li>
              <ImFacebook2 />
            </li>
            <li>
              <FaTwitterSquare />
            </li>
            <li>
              <FaInstagramSquare />
            </li>
            <li>
              <FaLinkedin />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
