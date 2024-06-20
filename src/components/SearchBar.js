import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div id="search-bar-container" className="row container margin-40">
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search your Pokemon"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(e);
        }}
      />
      <div id="start-search-button" className="center" onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </div>
    </div>
  );
};

export default SearchBar;
