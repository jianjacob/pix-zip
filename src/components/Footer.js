import React from "react";
import pixabay from "../assets/pixabay.svg";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        Made with{" "}
        <i className="material-icons" style={{ fontSize: "1em" }}>
          favorite
        </i>{" "}
        and <a href="https://reactjs.org">ReactJS</a>. Grid powered by{" "}
        <a href="https://material-ui.com">Material-UI</a>.
      </p>
      <p>API provided courtesy of</p>
      <a href="https://www.pixabay.com">
        <img
          src={pixabay}
          alt="Pixabay"
          style={{ maxWidth: "200px", margin: "10px" }}
        />
      </a>
    </div>
  );
};

export default Footer;
