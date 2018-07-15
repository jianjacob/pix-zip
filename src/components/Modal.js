import React, { Component } from "react";

import classNames from "classnames";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  handleLoad = () => {
    this.setState({
      loaded: true
    });
  };

  render() {
    return (
      <div className="modal" onClick={this.props.handleModalClose}>
        <div className="modal__frame">
          {!this.state.loaded && <span className="modal__spinner" />}
          <img
            className={classNames("modal__image", {
              "modal__image--hide": !this.state.loaded
            })}
            src={this.props.url}
            onLoad={this.handleLoad}
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default Modal;
