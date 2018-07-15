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
      <div className="drag-ui__img-container">
        {!this.state.loaded && <span className="drag-ui__img-spinner" />}
        <img
          id={this.props.index}
          className={classNames("drag-ui__img", {
            "drag-ui__img--hide": !this.state.loaded
          })}
          src={this.props.source}
          onDragStart={this.props.handleDragStart}
          onDragEnd={this.props.handleDragEnd}
          onLoad={this.handleLoad}
        />
        {this.state.loaded && (
          <span className="drag-ui__img-user">
            by: <a href={this.props.pageUrl}>{this.props.user}</a>{" "}
            <i
              className="drag-ui__img--open material-icons"
              onClick={() => this.props.handleModal(this.props.largeUrl)}
            >
              zoom_in
            </i>
          </span>
        )}
      </div>
    );
  }
}
