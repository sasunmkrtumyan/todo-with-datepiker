import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoForm";

// function reducer(state, action) {
//   if (action.type === "add") {
//     return [
//       ...todos,
//       {
//         id: Math.random(),
//         ...todo,
//         isCompleted: false,
//       },
//     ];
//   } else if (action.type === "delete") {
//     return [...todos].filter((todo) => todo.id !== id);
//   }
// }

export default function App() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isComplited, setIsComplited] = useState(false);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  // const [todos, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const info = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(info);
    console.log(info);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const info = JSON.stringify(todos);
    localStorage.setItem("todos", info);
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

  // function handleAdd(todo) {
  //   dispatch({
  //     type: "add",
  //     payload: {
  //       todo: todo
  //     }
  //   });
  // }

  function handleRemove(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }

  // function handleAdd(id) {
  //   dispatch({
  //     type: "delete",
  //     payload: {
  //       id: todo.id
  //     }
  //   });
  // }

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

  const handleToggle = (id) => {
    const updateTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

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
              <input type="checkbox" onClick={() => handleToggle(todo.id)} />
              {todoEditing === todo.id ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                  value={editingText}
                />
              ) : (
                <p className={todo.isCompleted ? "mark" : ""} key={todo.id}>
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
