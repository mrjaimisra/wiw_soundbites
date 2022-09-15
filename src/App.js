import React from 'react';
import logo from './logo.svg';
import './App.css';
import { h3SoundBites } from './H3.js';

function App() {
  function h3Bites() {
    return h3SoundBites().map((bite) => {
      return <Bite name={bite.name} src={bite.src} />
    });
  }

  return (
    <div className="App">
      <h1>Who Invited Will Sound Board</h1>
      <Bite name="Boing!" src="https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"/>
      <Bite name="Airhorn" src="https://cdn.staticcrate.com/stock-hd/audio/soundscrate-air-horn-designer-3.mp3"/>
      {h3Bites()}
    </div>
  );
}

export default App;

const Bite = props => {
  function play(event) {
    stopAllAudio();

    const audioElement = event.target.children[0];

    // audioElement.pause();
    audioElement.currentTime = 0;

    event.preventDefault();
    event.target.children[0].play();
  }

  function stopAllAudio(){
    document.querySelectorAll('audio').forEach(function(audio) { audio.pause(); });
  }

  return(
    <>
      <button onClick={(event) => play(event)}>
        {props.name}
        <audio src={props.src} />
      </button>
    </>
  )
}
