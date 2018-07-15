import React from "react";

import addIcon from "../../img/add-icon.png";

export default props => {
  return (
    <div
      className="drop-ui__zone"
      onDragOver={props.handleDragOver}
      onDrop={props.handleDrop}
    >
      <img className="drop-ui__add-icon" src={addIcon} alt="Add icon" />
      <p>Drop pictures here</p>
    </div>
  );
};
