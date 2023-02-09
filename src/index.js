import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

export default function App() {
    const [todos, setTodos] = React.useState([
      { id: 1, text: "Do Dishes", done: false },
      { id: 2, text: "Do Laundry", done: false },
      { id: 3, text: "Do Groceries", done: false },
    ])

    return (
      <div className="App">
        <h1>To-Do List</h1>
        
        <ToDoList setTodos={setTodos} todos={todos} />
        <AddToDo setTodos={setTodos} />
      </div>
    );
}

function ToDoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) => t.id === todo.id ? {
        ...t,
        done: !t.done
      } : t);
    setTodos(updatedTodos)
  }

  if(!todos.length) {
    return <p>No to-dos left!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li 
        onDoubleClick={() => handleToggleTodo(todo)}
        className={`todo-list-item${todo.done ?  ' done' : ''}` }
        key={todo.id}>
          { todo.text }
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  )
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

  return (
    <span 
    className="remove-button"
    onClick={handleDeleteTodo}
    role="button" 
    >remove</span>
  )
}

function AddToDo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAddToDo(event) {
    event.preventDefault();
    const text = event.target.elements.addToDo.value;
    const todo = {
      id: Math.random(),
      text,
      done: false
    };
    setTodos(prevTodos => {
      return prevTodos.concat(todo)
    })
    inputRef.current.value = "";
  }

  return (
    <form className="form" onSubmit={handleAddToDo}>
      <input className="add-to-do-input" name="addToDo" placeholder="Add To-Do" ref={inputRef} />
      <button className="add-to-do-button" type="submit">Add</button>
    </form>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);