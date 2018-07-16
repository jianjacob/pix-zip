import React, { Component } from "react";

import zipIcon from "../../img/download-icon.png";

import Placeholder from "./Placeholder";
import Image from "./Image";

const DropUI = props => {
  return (
    <div className="drop-ui">
      {props.library.length > 0 ? (
        <div
          className="drop-ui__images"
          onDragOver={props.handleDragOver}
          onDrop={props.handleDrop}
        >
          {props.library.map((img, i) => {
            return (
              <Image
                key={i}
                source={img.previewURL}
                zip_index={props.zip_index}
                deleteImage={props.deleteImage}
                index={i}
              />
            );
          })}
        </div>
      ) : (
        <Placeholder
          handleDragOver={props.handleDragOver}
          handleDrop={props.handleDrop}
        />
      )}

      {props.zip_index > 0 ? (
        <div className="drop-ui__download drop-ui__download--disable">
          <span className="drop-ui__spinner" /> Fetching {props.zip_index}/{
            props.library.length
          }
        </div>
      ) : props.library.length === 0 ? (
        ""
      ) : (
        <div className="drop-ui__download" onClick={props.handleZip}>
          <img className="drop-ui__zip-icon" src={zipIcon} alt="" />PIX-ZIP IT!
        </div>
      )}
    </div>
  );
};

export default DropUI;
