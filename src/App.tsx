import React from 'react';
import { CheckSquare } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';

function App() {
  const {
    todos,
    filter,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    setFilter,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              TodoFlow
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Beautiful task management for productive minds
          </p>
        </div>

        {/* Add Todo Input */}
        <div className="mb-8 animate-slide-in">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filters */}
        <div className="mb-6 animate-scale-in">
          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            stats={stats}
            onClearCompleted={clearCompleted}
            onToggleAll={toggleAll}
          />
        </div>

        {/* Todo List */}
        <div className="animate-bounce-in">
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
          <p className="mt-1">Data persisted locally in your browser</p>
        </footer>
      </div>
    </div>
  );
}

export default App;