import React, { Component, Fragment } from "react";
import keys from "./keys";
import dummy from "./dummy";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import Header from "./components/Header";
import Footer from "./components/Footer";

const API_URL = "https://pixabay.com/api/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      images: [],
      library: []
    };
  }

  handleSearch = e => {
    this.setState({ search: e.target.value });

    // fetch(
    //   `https://pixabay.com/api/?key=${API_URL}&q=yellow+flowers&image_type=photo&pretty=true`
    // )
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({ images: res.hits });
    //   });

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

  render() {
    return (
      <div className="app">
        {/* Logo and nav */}
        <Header />

        <div className="container">
          {/* Drop container and UI */}
          <div className="drop">
            <div className="drop-zone">
              <GridList cellHeight={100} cols={5}>
                {this.state.library.map((img, i) => (
                  <GridListTile key={i} cols={1}>
                    <img src={img.previewURL} alt="" />
                    <GridListTileBar
                      subtitle={<span>by: {img.user}</span>}
                      style={{ textAlign: "left", height: "20px" }}
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
            <a href="#" className="download-zip">
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
              {this.state.images.length > 0 ? (
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
                  {this.state.images.map((img, i) => (
                    <GridListTile key={i} cols={1}>
                      <img src={img.previewURL} alt="" />
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
