import React, { Component } from "react";
import keys from "./keys";
import dummy from "./dummy";

import addIcon from "./img/add-icon.png";
import searchIcon from "./img/search-icon.png";
import zipIcon from "./img/download-icon.png";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import classNames from "classnames";

import Header from "./components/Header";
import Footer from "./components/Footer";

const API_URL = "https://pixabay.com/api/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      images: {},
      library: [],
      index: 0,
      zip: null
    };
  }

  zipImages = (images, index) => {
    let imgArray = images || this.state.library.map(obj => obj.largeImageURL);

    if (index < imgArray.length) {
      fetch(imgArray[index])
        .then(res => res.arrayBuffer())
        .then(buffer => {
          var filename = this.getFileName(imgArray[index++]);
          this.state.zip.file(filename, buffer); // image has loaded, add it to archive
          this.zipImages(imgArray, index); // load next image
        });
    } else {
      this.state.zip.generateAsync({ type: "blob" }).then(content => {
        saveAs(content, "pix-zip.zip");
      });
    }
  };

  getFileName = url => {
    return url.substr(url.lastIndexOf("/") + 1);
  };

  handleZip = () => {
    this.setState(
      {
        zip: new JSZip()
      },
      () => {
        this.zipImages(null, 0);
      }
    );
  };

  handleDragStart = e => {
    e.dataTransfer.setData("text", e.target.id);
  };

  handleDragOver = e => {
    e.preventDefault();
  };

  handleDrop = e => {
    console.log(e.dataTransfer.getData("text"));
    this.setState({
      library: [
        ...this.state.library,
        this.state.images[this.state.search][e.dataTransfer.getData("text")]
      ]
    });
    e.dataTransfer.clearData();
  };

  handleSearch = e => {
    // this.setState({ search: e.target.value }, () => {
    //   fetch(
    //     `${API_URL}?key=${keys.pixabay}&q=${
    //       this.state.search
    //     }&image_type=photo&pretty=false&safesearch=true`
    //   )
    //     .then(res => res.json())
    //     .then(res => {
    //       if (!this.state.images[this.state.search]) {
    //         this.setState({
    //           images: { ...this.state.images, [this.state.search]: res.hits }
    //         });
    //       }
    //     });
    // });
    this.setState({ search: e.target.value });
    if (e.target.value === "") {
      this.setState({
        images: []
      });
    } else {
      this.setState({
        images: dummy.hits
      });
    }
  };

  deleteImage = e => {
    console.log(e);
  };

  render() {
    return (
      <div className="wrapper">
        {/* Header */}
        <Header />

        {/*Main App */}
        <div className="app">
          {/*Drop UI */}
          <div className="drop-ui">
            <div className="drop-ui__title">Library</div>
            {this.state.images.length > 0 ? (
              <div className="drop-ui__images">
                {this.state.images.map((img, i) => {
                  return (
                    <div key={i} className="drop-ui__img">
                      <img src={img.previewURL} />
                      <i className="drop-ui__img--delete material-icons">
                        clear
                      </i>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="drop-ui__zone">
                <img
                  className="drop-ui__add-icon"
                  src={addIcon}
                  alt="Add icon"
                />
                <p>Drop pictures here</p>
              </div>
            )}

            <div className="drop-ui__download">
              <img className="drop-ui__zip-icon" src={zipIcon} alt="" />PIX-ZIP
              IT!
            </div>
          </div>
          {/*Drag UI */}
          <div className="drag-ui">
            <div
              className={classNames("drag-ui__search", {
                "drag-ui__search--transition": this.state.search.length > 0
              })}
            >
              <img
                className={classNames("drag-ui__search-icon", {
                  "drag-ui__search-icon--transition":
                    this.state.search.length > 0
                })}
                src={searchIcon}
                alt="Search icon"
              />
              <input
                className={classNames("drag-ui__search-input", {
                  "drag-ui__search-input--transition":
                    this.state.search.length > 0
                })}
                type="text"
                placeholder="Type to search..."
                value={this.state.search}
                onChange={this.handleSearch}
              />
            </div>
            <div
              className={classNames("drag-ui__images", {
                "drag-ui__images--transition": this.state.search.length > 0
              })}
            >
              {this.state.images.length > 0
                ? this.state.images.map((img, i) => {
                    return <img key={i} src={img.previewURL} />;
                  })
                : ""}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default App;
