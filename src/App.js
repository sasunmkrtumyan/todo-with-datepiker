import React from "react";
import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import DatePicker from "react-date-picker";
import DataPickerList from "./components/DataPickerList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [date, onChange] = useState(new Date());

  
  function handleRemove(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }

  function handleAdd(text) {
    setTodos([
      ...todos,
      {
        id: Math.random(),
        text,
        isCompleted: false,
      },
    ]);
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
      <DatePicker onChange={onChange} value={date} />
      <TodoList
        todos={todos}
        handleRemove={handleRemove}
        handleMarkCompleted={handleMarkCompleted}
      />
      <DataPickerList date={date} />
    </div>
  );
}
