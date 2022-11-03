import React from 'react';
import { useState, useEffect } from 'react';
import { fireBaseApp } from './firebase';
// import { database } from './firebase';
// import logo from './logo.svg';
import './App.css';
import H3Bites from './H3Bites.js';
import Bite from './Bite.js';
// import { importH3SoundBites } from './H3Importer.js';
import { getDatabase, ref, child, get} from "firebase/database";
// import { onValue } from "firebase/database";

// const db = getDatabase();
const dbRef = ref(getDatabase());

// var HOST = window.location.origin.replace(/^http/, 'ws').split("3000")[0] + '3030'

var HOST = "wss://d948-174-63-112-66.ngrok.io/" + '3030'

const socket = new WebSocket(HOST)
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!');
});

function stopAllAudio() {
  document.querySelectorAll("audio").forEach((audio) => audio.pause());
}

socket.addEventListener('message', function (event) {
  console.log(process.env.REACT_APP_LISTENER);
  if (process.env.REACT_APP_LISTENER !== "true") return;

  console.log('Message from server', event.data);
  if (event.data === "Hello Server!" ) return;

  stopAllAudio();
  const audioElement = document.getElementById(event.data)?.children[0];
  if (!audioElement) return;

  // audioElement.pause();
  audioElement.currentTime = 0;
  audioElement.play();
});

socket.addEventListener('close', function (event) {
  console.log('The connection has been closed');
});

window.socket = socket;

function App() {
  const [search, setSearch] = useState("");
  const [bites, setBites] = useState([]);
  // const bitesRef = ref(db, 'bites');

  useEffect(() => {
    console.time("Get");
    get(child(dbRef, `bites/`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        setBites(snapshot.val());
      } else {
        console.log("NO BITES!");
      }

    }).catch((error) => {
      console.error(error);
    });
    console.timeEnd("Get")
  }, []);

  // the get() approach above seems to be faster according to console.time
  // useEffect(() => {
  //   console.time("OnValue")
  //   onValue(bitesRef, (snapshot) => {
  //     console.log(snapshot);
  //     setBites(snapshot.val());
  //   });
  //   console.timeEnd("OnValue")
  // }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  }

  // console.log(fireBaseApp); // for debugging
  // console.log(database); // for debugging

  return (
    <div className="App">
      {/* <button onClick={() => {
        importH3SoundBites();
      }}>Import</button> */}

      <h1>Who Invited Will Sound Board</h1>
      <Search search={search} handleSearch={handleSearch} />
      <Bite id="boing" speaker="000" name="Boing!" src="https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"/>
      <Bite id="airhorn" speaker="000" name="Airhorn" src="https://cdn.staticcrate.com/stock-hd/audio/soundscrate-air-horn-designer-3.mp3"/>
      <H3Bites search={search} bites={bites} />
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
