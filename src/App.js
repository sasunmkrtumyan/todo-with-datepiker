import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isComplited, setIsComplited] = useState(false);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

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

  function editTodo(id) {
    const updateTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updateTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  function handleRemove(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }

  const handleToggle = () => {
    setIsComplited(!isComplited);
  };

  // function handleMarkCompleted(id) {
  //   const newTodos = todos.map((todo) => {
  //     if (todo.id === id) {
  //       return { ...todo, isCompleted: !todo.isCompleted };
  //     }
  //     return todo;
  //   });
  //   setTodos(newTodos);
  // }

  return (
    <div className="App">
      <h1 className="header"> To Do List</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onSelect={handleSelect} />

      {todos
        .filter((todo) => todo.date === selectedDate)
        .map((todo) => {
          return (
            <div className="todoItem">
              <input type="checkbox" onClick={handleToggle} />
              {todoEditing === todo.id ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                  value={editingText}
                />
              ) : (
                <p className={isComplited ? "mark" : false} key={todo.id}>
                  {todo.text}
                </p>
              )}

              <div>
                {todoEditing === todo.id ? (
                  <button onClick={() => editTodo(todo.id)}>Submit</button>
                ) : (
                  <button
                    className="butEdit"
                    onClick={() => setTodoEditing(todo.id)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="butDelete"
                  onClick={() => handleRemove(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
