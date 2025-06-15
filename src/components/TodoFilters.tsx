import React from 'react';
import { FilterType } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
  onToggleAll: () => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  onFilterChange,
  stats,
  onClearCompleted,
  onToggleAll,
}) => {
  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
              {count !== undefined && (
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-black/20">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {stats.total > 0 && (
            <button
              onClick={onToggleAll}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              {stats.active > 0 ? 'Mark all complete' : 'Mark all active'}
            </button>
          )}
          {stats.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      {stats.total > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {stats.active} of {stats.total} tasks remaining
            </span>
            <div className="flex items-center gap-4">
              <span>Completed: {stats.completed}</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-success-400 to-success-500 transition-all duration-300"
                  style={{
                    width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};