import React from "react";
import TodoItem from "./TodoItem";

export default function TodoLIst({ todos, handleRemove, handleMarkCompleted }) {
  return todos.map((todo) => {
    return (
      <div key={todo.id}>
        <TodoItem
          todo={todo}
          handleRemove={handleRemove}
          handleMarkCompleted={handleMarkCompleted}
        />
      </div>
    );
  });
}
