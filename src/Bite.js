const Bite = props => {
  function play(event) {
    stopAllAudio();

    const audioElement = event.target.children[0];

    // audioElement.pause();
    audioElement.currentTime = 0;

    event.preventDefault();
    event.target.children[0].play();
  }

  function stopAllAudio() {
    document.querySelectorAll("audio").forEach((audio) => audio.pause());
  }

  return(
    <>
      <button
        onClick={(event) => play(event)}
        style={{
          backgroundColor: "#3098A5",
          borderRadius: "10px",
          color: "white",
          fontSize: "1em",
          fontWeight: "bold",
          height: "fit-content",
          margin: "0.5vw",
          padding: "1vw"
        }}
      >
        {props.name}
        <audio src={props.src} />
      </button>
    </>
  )
}

export default Bite;
