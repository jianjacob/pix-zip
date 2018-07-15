import React from "react";

import pixabay from "../img/pixabay.png";

const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <span className="footer__text">
          Made with{" "}
          <i
            className="footer__heart material-icons"
            style={{ fontSize: "1em" }}
          >
            favorite
          </i>{" "}
          and{" "}
          <a className="footer__link" href="https://reactjs.org">
            ReactJS
          </a>.
        </span>
        <a href="https://pixabay.com">
          <img className="footer__pixabay" src={pixabay} alt="Pixabay logo" />
        </a>
      </footer>
    </div>
  );
};

export default Footer;
