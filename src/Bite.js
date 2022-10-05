const Bite = props => {
  function play(event) {
    event.preventDefault();
    window.socket.send(event.target.id);
  }

  return(
    <>
      <button
        id={props.id}
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
