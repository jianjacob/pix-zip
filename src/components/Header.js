import React from "react";

import logo from "../img/logo.png";

const Header = () => {
  return (
    <div className="header">
      <header className="header__semantic">
        <h1 className="header__h1--hidden">Pix-Zip</h1>
        <img className="header__logo" src={logo} alt="Pix-Zip" />
        <h5 className="header__subtitle">
          The Image Search App for Developers
        </h5>
        <a
          className="github-button header__github"
          href="https://github.com/jianjacob/pix-zip"
          data-icon="octicon-star"
          data-show-count="true"
          aria-label="Star jianjacob/pix-zip on GitHub"
        >
          Star
        </a>
        <div className="header__feature-banner">
          <div className="header__feature-one">
            <p>Search for images using powerful API</p>
          </div>
          <div className="header__feature-two">
            <p>Drag and drop your favorite images into the library</p>
          </div>
          <div className="header__feature-three">
            <p>Download all images into a single ZIP file</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
