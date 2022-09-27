import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import H3Bites from './H3Bites.js';
import Bite from './Bite.js';

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  }

  return (
    <div className="App">
      <h1>Who Invited Will Sound Board</h1>
      <Search search={search} handleSearch={handleSearch} />
      <Bite speaker="000" name="Boing!" src="https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"/>
      <Bite speaker="000" name="Airhorn" src="https://cdn.staticcrate.com/stock-hd/audio/soundscrate-air-horn-designer-3.mp3"/>
      <H3Bites search={search} />
    </div>
  );
}

export default App;

function Search(props) {
  return(
    <div style={{display: "flex", justifyContent: "space-around"}}>
      <input
        autoFocus
        style={{fontSize: "2em", width: "90%"}}
        type="search"
        value={props.search}
        onChange={(event) => props.handleSearch(event)}
      />
    </div>
  );
}
