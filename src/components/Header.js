import React from "react";

const Header = () => {
  return (
    <div className="app-header">
      <h1 className="app-title">pix-zip</h1>
      <div className="app-intro">
        <p>Image search for developers made easy!</p>
        <ol>
          <li>Search royalty-free images on popular search engines</li>
          <li>Drag and drop your favorite images into the zip library</li>
          <li>
            Download a compressed zip archive containing the pictures you chose
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Header;
