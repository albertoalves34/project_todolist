import React, { useState, useRef, useEffect } from 'react';
import { Check, X, Edit3, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="group animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
        <div className="flex items-center gap-4">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
              todo.completed
                ? 'bg-success-500 border-success-500 text-white'
                : 'border-gray-300 hover:border-primary-400'
            }`}
          >
            {todo.completed && <Check size={14} />}
          </button>

          {/* Text or Input */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                className="w-full px-2 py-1 text-gray-800 bg-transparent border-b-2 border-primary-300 focus:outline-none focus:border-primary-500"
              />
            ) : (
              <span
                className={`block text-gray-800 cursor-pointer transition-all duration-200 ${
                  todo.completed
                    ? 'line-through text-gray-500'
                    : 'group-hover:text-gray-900'
                }`}
                onClick={handleEdit}
              >
                {todo.text}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {!isEditing && (
              <>
                <button
                  onClick={handleEdit}
                  className="p-2 text-gray-400 hover:text-primary-500 transition-colors duration-200 rounded-lg hover:bg-primary-50"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
            {isEditing && (
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};