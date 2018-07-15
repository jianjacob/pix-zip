import React, { Component } from "react";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import _ from "lodash";
import runtimeEnv from "@mars/heroku-js-runtime-env";

import Header from "./components/Header";
import Footer from "./components/Footer";
import DropUI from "./components/Drop-UI/DropUI";
import DragUI from "./components/Drag-UI/DragUI";

const env = runtimeEnv();

const API_URL = "https://pixabay.com/api/";

const API_KEY = env.REACT_APP_PIXABAY; //|| require("./keys").pixabay;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      images: {},
      library: [],
      zip_index: 0,
      zip: null,
      dragging: false
    };

    this.handleSearchDebounced = _.debounce(function() {
      this.handleFetch.apply(this, [this.state.search]);
    }, 500);
  }

  zipImages = (images, index) => {
    let imgArray = images || this.state.library.map(obj => obj.largeImageURL);

    if (index < imgArray.length) {
      this.setState({ zip_index: index + 1 });
      fetch(imgArray[index])
        .then(res => {
          return res.arrayBuffer();
        })
        .then(buffer => {
          var filename = this.getFileName(imgArray[index++]);
          this.state.zip.file(filename, buffer); // image has loaded, add it to archive
          this.zipImages(imgArray, index); // load next image
        });
    } else {
      this.state.zip.generateAsync({ type: "blob" }).then(content => {
        saveAs(content, "pix-zip.zip");
      });
      this.setState({ zip_index: 0 });
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
    this.setState({
      dragging: true
    });
  };

  handleDragOver = e => {
    if (this.state.zip_index === 0 && this.state.dragging) {
      e.preventDefault();
    }
  };

  handleDrop = e => {
    this.setState({
      library: [
        ...this.state.library,
        this.state.images[this.state.search][e.dataTransfer.getData("text")]
      ],
      dragging: false
    });
    e.dataTransfer.clearData();
  };

  handleDragEnd = () => {
    this.setState({ dragging: false });
  };

  handleFetch = query => {
    if (query.trim() !== "") {
      fetch(
        `${API_URL}?key=${API_KEY}&q=${query}&image_type=photo&pretty=false&safesearch=true`
      )
        .then(res => res.json())
        .then(res => {
          if (!this.state.images[query]) {
            this.setState({
              images: { ...this.state.images, [query]: res.hits }
            });
          }
        });
    }
  };

  handleSearch = e => {
    this.setState({ search: e.target.value }, () => {
      this.handleSearchDebounced();
    });
    // this.setState({ search: e.target.value });
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

  deleteImage = index => {
    this.setState({
      library: [
        ...this.state.library.slice(0, index),
        ...this.state.library.slice(index + 1)
      ]
    });
  };

  render() {
    return (
      <div className="wrapper">
        {/* Header */}
        <Header />

        {/*Main App */}
        <div className="app">
          {/*Drop UI */}
          <DropUI
            images={this.state.images}
            handleDragOver={this.handleDragOver}
            handleDrop={this.handleDrop}
            library={this.state.library}
            handleZip={this.handleZip}
            zip_index={this.state.zip_index}
            deleteImage={this.deleteImage}
          />
          {/*Drag UI */}
          <DragUI
            images={this.state.images}
            search={this.state.search}
            handleSearch={this.handleSearch}
            handleDragStart={this.handleDragStart}
            handleDragEnd={this.handleDragEnd}
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default App;
