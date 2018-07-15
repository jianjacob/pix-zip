import React, { Component } from "react";

import classNames from "classnames";

export default class Image extends Component {
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
      <div className="drop-ui__img">
        {!this.state.loaded && <span className="drop-ui__img-spinner" />}
        <img
          src={this.props.source}
          draggable={false}
          onLoad={this.handleLoad}
          className={classNames({ "drop-ui__img--hide": !this.state.loaded })}
        />
        {this.state.loaded &&
          (this.props.zip_index > 0 ? (
            <i className="drop-ui__img--delete material-icons">clear</i>
          ) : (
            <i
              className="drop-ui__img--delete material-icons"
              onClick={() => this.props.deleteImage(this.props.index)}
            >
              clear
            </i>
          ))}
      </div>
    );
  }
}
