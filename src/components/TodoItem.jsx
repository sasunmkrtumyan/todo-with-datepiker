import React from "react";

export default function TodoItem({ todo, handleRemove, handleEdite,  handleMarkCompleted }) {
  const { id, text } = todo;
  return (
    <div>
      <div className="list">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => handleMarkCompleted(id)}
        />
        <p className={`text ${todo.isCompleted ? "overline" : ""}`}>{text}</p>
        <button onClick={() => handleEdite(id)} className="btn">
          edit
        </button>
        <button onClick={() => handleRemove(id)} className="btn">
          delete
        </button>
      </div>
    </div>
  );
}
