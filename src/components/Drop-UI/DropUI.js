import React, { Component } from "react";

import zipIcon from "../../img/download-icon.png";
import addIcon from "../../img/add-icon.png";

class DropUI extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="drop-ui">
        <div className="drop-ui__title">Library</div>
        {this.props.library.length > 0 ? (
          <div
            className="drop-ui__images"
            onDragOver={this.props.handleDragOver}
            onDrop={this.props.handleDrop}
          >
            {this.props.library.map((img, i) => {
              return (
                <div key={i} className="drop-ui__img">
                  <img src={img.previewURL} draggable={false} />
                  {this.props.zip_index > 0 ? (
                    <i className="drop-ui__img--delete material-icons">clear</i>
                  ) : (
                    <i
                      className="drop-ui__img--delete material-icons"
                      onClick={() => this.props.deleteImage(i)}
                    >
                      clear
                    </i>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="drop-ui__zone"
            onDragOver={this.props.handleDragOver}
            onDrop={this.props.handleDrop}
          >
            <img className="drop-ui__add-icon" src={addIcon} alt="Add icon" />
            <p>Drop pictures here</p>
          </div>
        )}

        {this.props.zip_index > 0 ? (
          <div className="drop-ui__download drop-ui__download--disable">
            <span className="drop-ui__spinner" /> Fetching{" "}
            {this.props.zip_index}/{this.props.library.length}
          </div>
        ) : this.props.library.length === 0 ? (
          <div className="drop-ui__download drop-ui__download--disable">
            <img className="drop-ui__zip-icon" src={zipIcon} alt="" />PIX-ZIP
            IT!
          </div>
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
