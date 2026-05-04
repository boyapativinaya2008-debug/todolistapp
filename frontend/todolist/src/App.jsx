import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://todolistapp-bvk3.onrender.com/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch todos
  const getTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!title) return;
    await axios.post(API, { title });
    setTitle("");
    getTodos();
  };

  // Toggle complete
  const toggleTodo = async (id) => {
    await axios.put(`${API}/${id}`);
    getTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    getTodos();
  };



return (
  <div className="container">
    <h2>📋 Todo App</h2>

    <div className="input-box">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />
      <button className="add-btn" onClick={addTodo}>
        Add
      </button>
    </div>

    <ul>
      {todos.length === 0 && (
        <p className="empty">No tasks found</p>
      )}

      {todos.map((todo) => (
        <li key={todo._id}>
          <span
            className={`todo-text ${
              todo.completed ? "completed" : ""
            }`}
            onClick={() => toggleTodo(todo._id)}
          >
            {todo.title}
          </span>

          <button
            className="delete-btn"
            onClick={() => deleteTodo(todo._id)}
          >
            ✖
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;