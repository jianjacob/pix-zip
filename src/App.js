import React, { Component, Fragment } from "react";
import keys from "./keys";
import dummy from "./dummy";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const API_URL = "https://pixabay.com/api/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      images: []
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
      // Logo and nav
      <div className="app">
        <div className="app-header">
          <h1 className="app-title">pix-zip</h1>
          <div className="app-intro">
            <p>Image search for developers made easy!</p>
            <ol>
              <li>Search royalty-free images on popular search engines</li>
              <li>Drag and drop your favorite images into the zip library</li>
              <li>
                Download a compressed zip archive containing the pictures you
                chose
              </li>
            </ol>
          </div>
        </div>

        <div className="container">
          <div className="drop">
            <p>Drop UI</p>
          </div>

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
                <p>Empty</p>
              )}
            </div>
          </div>
        </div>

        <div className="footer">
          <p>Copyright 2018</p>
        </div>
      </div>
    );
  }
}

export default App;
