import React, { Component, Fragment } from "react";

import Modal from "../Modal";

import searchIcon from "../../img/search-icon.png";

import classNames from "classnames";

class DragUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalURL: ""
    };
  }

  handleModal = url => {
    this.setState({
      showModal: true,
      modalURL: url
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
      modalURL: ""
    });
  };

  render() {
    return (
      <div className="drag-ui">
        <div
          className={classNames("drag-ui__search", {
            "drag-ui__search--transition": this.props.search.length > 0
          })}
        >
          <img
            className={classNames("drag-ui__search-icon", {
              "drag-ui__search-icon--transition": this.props.search.length > 0
            })}
            src={searchIcon}
            alt="Search icon"
          />
          <input
            className={classNames("drag-ui__search-input", {
              "drag-ui__search-input--transition": this.props.search.length > 0
            })}
            type="text"
            placeholder="Type to search..."
            value={this.props.search}
            onChange={this.props.handleSearch}
          />
        </div>
        <div
          className={classNames("drag-ui__images", {
            "drag-ui__images--transition": this.props.search.length > 0
          })}
        >
          {this.props.images[this.props.search] &&
          this.props.images[this.props.search].length > 0
            ? this.props.images[this.props.search].map((img, i) => {
                return (
                  <div key={i} className="drag-ui__img-container">
                    <img
                      id={i}
                      className="drag-ui__img"
                      src={img.webformatURL}
                      onDragStart={this.props.handleDragStart}
                      onDragEnd={this.props.handleDragEnd}
                    />
                    <span className="drag-ui__img-user">
                      by: <a href={img.pageURL}>{img.user}</a>{" "}
                      <i
                        className="drag-ui__img--open material-icons"
                        onClick={() => this.handleModal(img.largeImageURL)}
                      >
                        zoom_in
                      </i>
                    </span>
                  </div>
                );
              })
            : ""}
        </div>
        {this.state.showModal && (
          <Modal
            url={this.state.modalURL}
            handleModalClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}

export default DragUI;
