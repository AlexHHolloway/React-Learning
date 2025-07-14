import { useState, useRef } from "react";

export default function Player() {
  const inputName = useRef();

  const [playerName, setPlayerName] = useState(null);

  function handleSubmit() {
    setPlayerName(inputName.current.value);
    inputName.current.value = "";
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <section id="player">
      <h2>Welcome, {playerName ?? "New Player"}!</h2>
      <p>
        <input 
          ref={inputName}
          type="text"
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
