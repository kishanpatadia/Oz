import type { FilterType } from '../types/todo';
import './FilterButtons.css';

interface FilterButtonsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: FilterType[] = ['all', 'active', 'completed'];

export function FilterButtons({ filter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="filters">
      {filters.map(f => (
        <button
          key={f}
          className={`filter-btn ${filter === f ? 'active' : ''}`}
          onClick={() => onFilterChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
