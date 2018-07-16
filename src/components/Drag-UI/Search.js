import React from "react";

import searchIcon from "../../img/search-icon.png";

import classNames from "classnames";

const Search = props => {
  return (
    <div
      className={classNames("drag-ui__search", {
        "drag-ui__search--transition": props.search.length > 0
      })}
    >
      <img
        className={classNames("drag-ui__search-icon", {
          "drag-ui__search-icon--transition": props.search.length > 0
        })}
        src={searchIcon}
        alt="Search icon"
      />
      <input
        className={classNames("drag-ui__search-input", {
          "drag-ui__search-input--transition": props.search.length > 0
        })}
        type="text"
        placeholder="Type to search..."
        value={props.search}
        onChange={props.handleSearch}
      />
    </div>
  );
};

export default Search;
