import React from 'react';
import logo from './logo.svg';
import './App.css';
import H3Bites from './H3Bites.js';
import Bite from './Bite.js';

function App() {
  return (
    <div className="App">
      <h1>Who Invited Will Sound Board</h1>
      <Bite name="Boing!" src="https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"/>
      <Bite name="Airhorn" src="https://cdn.staticcrate.com/stock-hd/audio/soundscrate-air-horn-designer-3.mp3"/>
      <H3Bites />
    </div>
  );
}

export default App;
