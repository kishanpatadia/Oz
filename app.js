// Todo App

class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.filter = 'all';
        
        // DOM elements
        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('todo-input');
        this.list = document.getElementById('todo-list');
        this.itemsLeft = document.getElementById('items-left');
        this.clearBtn = document.getElementById('clear-completed');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // Add new todo
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo(this.input.value.trim());
            this.input.value = '';
        });

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filter = btn.dataset.filter;
                this.render();
            });
        });

        // Clear completed
        this.clearBtn.addEventListener('click', () => {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.save();
            this.render();
        });
    }

    addTodo(text) {
        if (!text) return;
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        this.todos.push(todo);
        this.save();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.save();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
        this.render();
    }

    getFilteredTodos() {
        switch (this.filter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    render() {
        const filtered = this.getFilteredTodos();
        
        if (filtered.length === 0) {
            this.list.innerHTML = '<li class="empty-state">No todos yet. Add one above!</li>';
        } else {
            this.list.innerHTML = filtered.map(todo => `
                <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        onchange="app.toggleTodo(${todo.id})"
                    >
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">Delete</button>
                </li>
            `).join('');
        }

        // Update items left count
        const activeCount = this.todos.filter(t => !t.completed).length;
        this.itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
const app = new TodoApp();
