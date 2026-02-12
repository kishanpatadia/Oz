import { useState, type FormEvent } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoItem } from './components/TodoItem';
import { FilterButtons } from './components/FilterButtons';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeCount,
  } = useTodos();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo(input);
    setInput('');
  };

  return (
    <div className="container">
      <h1>📝 My Todos</h1>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          autoComplete="off"
        />
        <button type="submit">Add</button>
      </form>

      <FilterButtons filter={filter} onFilterChange={setFilter} />

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="empty-state">No todos yet. Add one above!</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </ul>

      <div className="footer">
        <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
        <button className="clear-btn" onClick={clearCompleted}>
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default App;
