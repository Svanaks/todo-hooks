import React, { useState } from "react";
import "./App.css";

// Destructuring for the props
function Todo({ todo, index, changeTodoCompletion, removeTodo }) {
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      className="todo"
    >
      {todo.text}
      <div>
        <button onClick={() => changeTodoCompletion(index)}>
          {todo.isCompleted === true ? "Uncheck" : "Check"}
        </button>
        <button onClick={() => removeTodo(index)}>X</button>
      </div>
    </div>
  );
}

// The method addTodo comes from the props
function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleFormSubmit = e => {
    e.preventDefault();

    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add todo..."
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  // useState gives 2 variables, the value of the state, and a function to update the state
  const [todos, setTodos] = useState([
    {
      text: "Todo number 1",
      isCompleted: false
    },
    {
      text: "Todo number 2",
      isCompleted: false
    },
    {
      text: "Another effing todo",
      isCompleted: false
    },
    {
      text: "Last todo I swear",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const changeTodoCompletion = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            changeTodoCompletion={changeTodoCompletion}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
