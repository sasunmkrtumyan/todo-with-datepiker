import { useState, useEffect } from "react";
import DatePicker from "react-date-picker";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(false);


  function handleChangeText(e) {
    setText(e.target.value);
    if (error && date) {
      setError(false);
    }
  }

  function onChange(date) {
    setDate(date);
    if (error && text) {
      setError(false);
    }
  }

  function handleAdd() {
    if (!text.trim() || !date) {
      return setError(true);
    }
    onAdd({ text, date: date.toDateString() });
    setText("");
    setDate(null);
  }

  return (
    <>
      <input
        className="inp"
        type="text"
        value={text}
        placeholder="ex. cretrix task"
        onChange={handleChangeText}
      />
      <DatePicker onChange={onChange} value={date} />
      <button className="btn but" onClick={handleAdd}>
        add
      </button>
      {error && <p style={{ color: "red" }}>Please fill in all fields</p>}
    </>
  );
}
