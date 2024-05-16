import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdite] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      const editTodo = todos.find((i) => i.id === edit);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );

      setTodos(updatedTodos);
      setEdite(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };
  const handleDelete = (id) => {
    const deleteTodo = todos.filter((to) => to.id !== id);
    setTodos([...deleteTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEdite(id);
  };
  return (
    <>
      <div className="App">
        <div className="container">
          <h1>Todo List App</h1>
          <form className="todo-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit">{edit ? "Edit" : "Go"}</button>
          </form>
          <ul className="all-todoes">
            {todos.map((t) => (
              <li className="single-todo" key={t.id}>
                <span className="todo-text" key={t.id}>
                  {t.todo}
                </span>
                <button onClick={() => handleEdit(t.id)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
