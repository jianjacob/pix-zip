import React, { Component } from "react";

import zipIcon from "../../img/download-icon.png";

import Placeholder from "./Placeholder";
import Image from "./Image";

class DropUI extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="drop-ui">
        {this.props.library.length > 0 ? (
          <div
            className="drop-ui__images"
            onDragOver={this.props.handleDragOver}
            onDrop={this.props.handleDrop}
          >
            {this.props.library.map((img, i) => {
              return (
                <Image
                  key={i}
                  source={img.previewURL}
                  zip_index={this.props.zip_index}
                  deleteImage={this.props.deleteImage}
                  index={i}
                />
              );
            })}
          </div>
        ) : (
          <Placeholder
            handleDragOver={this.props.handleDragOver}
            handleDrop={this.props.handleDrop}
          />
        )}

        {this.props.zip_index > 0 ? (
          <div className="drop-ui__download drop-ui__download--disable">
            <span className="drop-ui__spinner" /> Fetching{" "}
            {this.props.zip_index}/{this.props.library.length}
          </div>
        ) : this.props.library.length === 0 ? (
          ""
        ) : (
          <div className="drop-ui__download" onClick={this.props.handleZip}>
            <img className="drop-ui__zip-icon" src={zipIcon} alt="" />PIX-ZIP
            IT!
          </div>
        )}
      </div>
    );
  }
}

export default DropUI;
