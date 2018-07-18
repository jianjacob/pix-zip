import React from "react";

import addIcon from "../../img/add-icon-2.png";

import { DropContext } from "../../App";

const Placeholder = props => {
  return (
    <DropContext.Consumer>
      {handler => (
        <div
          className="drop-ui__zone"
          onDragOver={handler.handleDragOver}
          onDrop={handler.handleDrop}
        >
          <img className="drop-ui__add-icon" src={addIcon} alt="Add icon" />
          <p>Drop pictures here</p>
        </div>
      )}
    </DropContext.Consumer>
  );
};

export default Placeholder;
