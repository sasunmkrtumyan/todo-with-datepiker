import React from "react";
import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  function handleChangeText(e) {
    setText(e.target.value);
    if (error) {
      setError(false);
    }
  }

  return (
    <form
      className="input"
      onSubmit={(e) => {
        e.preventDefault();
        if (text) {
          onAdd(text);
          setText("");
        } else {
          setError(true);
        }
      }}
    >
      <input
        className="inp"
        type="text"
        value={text}
        placeholder="ex. cretrix task"
        onChange={handleChangeText}
      />
      
      <button className="btn but">add</button>
      {error && <p style={{ color: "red" }}>Please add a title</p>}
    </form>
  );
}