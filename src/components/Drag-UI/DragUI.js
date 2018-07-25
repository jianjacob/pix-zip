import React, { Component } from "react";

import Modal from "../Modal";
import Search from "./Search";
import Image from "./Image";

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
        <Search
          search={this.props.search}
          handleSearch={this.props.handleSearch}
        />
        <div
          id="scrollable"
          className={classNames("drag-ui__images", {
            "drag-ui__images--transition": this.props.search.length > 0
          })}
          onWheel={this.props.handleScroll}
        >
          {this.props.images[this.props.search] &&
          this.props.images[this.props.search].length > 0
            ? this.props.images[this.props.search].map((img, i) => {
                return (
                  <Image
                    key={i}
                    source={img.webformatURL}
                    index={i}
                    pageUrl={img.pageURL}
                    user={img.user}
                    handleModal={this.handleModal}
                    largeUrl={img.largeImageURL}
                  />
                );
              })
            : ""}
        </div>
        {/* Load Modal component but keep hidden until required */}
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
