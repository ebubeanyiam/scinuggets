import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

import "../style/footer.css";

const Footer = () => {
  const getYear = () => {
    const date = new Date();
    const year = date.getFullYear();

    return year;
  };
  return (
    <footer className="footer">
      <div className="footer__container">
        <nav className="footer__navlinks">
          <Link to="">Home</Link>
          <Link to="">Tags</Link>
          <Link to="">Code of Conduct</Link>
          <Link to="">FAQ</Link>
          <Link to="">Sponsors</Link>
          <Link to="">About</Link>
          <Link to="">Privacy Policy</Link>
          <Link to="">Terms of Use</Link>
          <Link to="">Contact</Link>
        </nav>

        <div className="footer__social">
          <AiOutlineTwitter />
          <AiFillFacebook />
          <AiOutlineGithub />
          <AiOutlineInstagram />
        </div>

        <div className="footer__about">
          <span>
            <b>SCINUGGETS</b> - A constructive and inclusive blog for
            articulated writers. Document every step of your journey.
          </span>
        </div>

        <div className="footer__footer">
          <span>
            Made with <span style={{ color: "red" }}>&#x2764;</span> and React.
            Scinuggets &copy; 2016 - {getYear()}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
