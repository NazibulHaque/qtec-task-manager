import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');
  const debounced = useDebounce(value, 400);

  useEffect(() => { onSearch(debounced); }, [debounced]);

  return (
    <div className="relative flex-1 max-w-xs">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8888a0]"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-[#1e1e23] border border-[#2a2a30] rounded-lg
          pl-9 pr-4 py-2 text-sm text-[#f0f0f5] placeholder-[#555568]
          outline-none focus:border-[#7c6dfa] focus:ring-1 focus:ring-[#7c6dfa]"
      />
    </div>
  );
}