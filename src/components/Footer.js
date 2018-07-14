import React from "react";

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
      </footer>
    </div>
  );
};

export default Footer;
