import React, { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative group">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className="w-full px-6 py-4 pl-14 text-lg bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};