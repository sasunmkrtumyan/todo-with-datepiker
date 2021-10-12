import React from "react";
import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  function handleAdd(todo) {
    setTodos([
      ...todos,
      {
        id: Math.random(),
        ...todo,
        isCompleted: false,
      },
    ]);
  }

  function handleSelect(date) {
    setSelectedDate(date);
  }

  function handleRemove(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }

  function handleMarkCompleted(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h1 className="header"> To Do List</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onSelect={handleSelect} />

      {todos
        .filter((todo) => todo.date === selectedDate)
        .map((todo) => {
          return (
            <>
              <p key={todo.id}>{todo.text}</p>
              {/* <button onClick={() => handleRemove(todo.id)}>Edit</button> */}
              <button onClick={() => handleRemove(todo.id)}>Delete</button>
            </>
          );
        })}
    </div>
  );
}
