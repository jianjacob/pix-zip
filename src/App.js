import React, { Component, Fragment } from "react";
import keys from "./keys";
import dummy from "./dummy";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import JSZip from "jszip";
import { saveAs } from "file-saver";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Icon } from "@material-ui/core";

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
    this.setState({ search: e.target.value }, () => {
      fetch(
        `${API_URL}?key=${keys.pixabay}&q=${
          this.state.search
        }&image_type=photo&pretty=false&safesearch=true`
      )
        .then(res => res.json())
        .then(res => {
          if (!this.state.images[this.state.search]) {
            this.setState({
              images: { ...this.state.images, [this.state.search]: res.hits }
            });
          }
        });
    });
    // if (e.target.value === "") {
    //   this.setState({
    //     images: []
    //   });
    // } else {
    //   this.setState({
    //     images: dummy.hits
    //   });
    // }
  };

  deleteImage = e => {
    console.log(e);
  };

  render() {
    return (
      <div className="app">
        {/* Logo and nav */}
        <Header />

        <div className="container">
          {/* Drop container and UI */}
          <div className="drop">
            <div
              className="drop-zone"
              onDragOver={this.handleDragOver}
              onDrop={this.handleDrop}
            >
              {this.state.library.length > 0 ? (
                <GridList cellHeight={100} cols={5}>
                  {this.state.library.map((img, i) => (
                    <GridListTile key={i} cols={1}>
                      <img src={img.previewURL} alt="" draggable={false} />
                      <GridListTileBar
                        titlePosition="top"
                        style={{
                          height: "30px",
                          backgroundColor: "rgba(0, 0, 0, 0.2)"
                        }}
                        actionIcon={
                          <IconButton onClick={this.deleteImage}>
                            <DeleteForeverIcon
                              style={{ color: "rgba(255, 0, 0, 1)" }}
                            />
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  ))}
                </GridList>
              ) : (
                <div className="drop-placeholder" draggable={false}>
                  Drop Here
                </div>
              )}
            </div>
            <a className="download-zip" onClick={this.handleZip}>
              Download ZIP
            </a>
          </div>

          {/* Search container and UI */}
          <div className="search">
            <div>
              <input
                className="search-input"
                type="text"
                placeholder="search images"
                value={this.state.search}
                onChange={this.handleSearch}
              />
            </div>
            <div className="search-images">
              {this.state.images[this.state.search] &&
              this.state.images[this.state.search].length > 0 ? (
                <GridList cellHeight={160} cols={3}>
                  <GridListTile
                    key="Subheader"
                    cols={3}
                    style={{ height: "auto" }}
                  >
                    <ListSubheader component="div">
                      Results for: {this.state.search}
                    </ListSubheader>
                  </GridListTile>
                  {this.state.images[this.state.search].map((img, i) => (
                    <GridListTile key={i} cols={1}>
                      <img
                        id={i}
                        src={img.previewURL}
                        alt=""
                        onDragStart={this.handleDragStart}
                      />
                      <GridListTileBar
                        subtitle={<span>by: {img.user}</span>}
                        actionIcon={
                          <IconButton>
                            <InfoIcon
                              style={{ color: "rgba(255, 255, 255, 0.54)" }}
                            />
                          </IconButton>
                        }
                        style={{ textAlign: "left" }}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              ) : (
                <p className="empty-title">Empty</p>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
