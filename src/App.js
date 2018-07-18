import React, { Component } from "react";

// importing libraries
import JSZip from "jszip";
import { saveAs } from "file-saver";
import _ from "lodash";
// for private runtime vars from heroku
import runtimeEnv from "@mars/heroku-js-runtime-env";

// import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import DropUI from "./components/Drop-UI/DropUI";
import DragUI from "./components/Drag-UI/DragUI";

const env = runtimeEnv();

// private key
const API_KEY = env.REACT_APP_PIXABAY; // || require("./keys").pixabay;

const API_URL = "https://pixabay.com/api/";

// Context creation to store Drag and Drop feature implementation
export const DragContext = React.createContext();
export const DropContext = React.createContext();

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

    // debounced search to prevent unnecessary API calls
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
          this.state.zip.file(filename, buffer);
          this.zipImages(imgArray, index); // load next image
        });
    } else {
      this.state.zip.generateAsync({ type: "blob" }).then(content => {
        saveAs(content, "pix-zip.zip");
      });
      this.setState({ zip_index: 0 });
    }
  };

  // helper method for zip creation
  getFileName = url => {
    return url.substr(url.lastIndexOf("/") + 1);
  };

  handleZip = () => {
    this.setState(
      {
        // zip needs to be created early
        zip: new JSZip()
      },
      () => {
        this.zipImages(null, 0);
      }
    );
  };

  handleFetch = query => {
    if (query.trim() !== "") {
      // prevent empty search param to API
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
          {/*Drop UI and setup */}
          <DropContext.Provider
            value={{
              // only allow images from application to be dragged and dropped
              handleDragOver: e => {
                if (this.state.zip_index === 0 && this.state.dragging) {
                  e.preventDefault();
                }
              },
              handleDrop: e => {
                e.preventDefault();
                this.setState({
                  library: [
                    ...this.state.library,
                    this.state.images[this.state.search][
                      e.dataTransfer.getData("text")
                    ]
                  ],
                  dragging: false
                });
              }
            }}
          >
            <DropUI
              images={this.state.images}
              library={this.state.library}
              handleZip={this.handleZip}
              zip_index={this.state.zip_index}
              deleteImage={this.deleteImage}
            />
          </DropContext.Provider>

          {/*Drag UI and setup */}
          <DragContext.Provider
            value={{
              handleDragStart: e => {
                e.dataTransfer.setData("text", e.target.id);
                this.setState({
                  dragging: true
                });
              },
              // ensures only images from application have valid droppable state
              handleDragEnd: () => {
                this.setState({ dragging: false });
              }
            }}
          >
            <DragUI
              images={this.state.images}
              search={this.state.search}
              handleSearch={this.handleSearch}
            />
          </DragContext.Provider>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default App;
