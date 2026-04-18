import { useState, useRef, useEffect } from 'react';

export function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#1e1e23] border border-[#2a2a30]
          rounded-lg px-3 py-2 text-sm text-[#8888a0] hover:border-[#3a3a45]
          hover:text-[#f0f0f5] whitespace-nowrap"
      >
        <span>{label}:</span>
        <span className="text-[#7c6dfa] font-medium">
          {selected?.label || 'All'}
        </span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 left-0 bg-[#1e1e23] border border-[#2a2a30]
          rounded-xl shadow-2xl z-50 min-w-[150px] overflow-hidden py-1">
          <button
            onClick={() => { onChange(''); setOpen(false); }}
            className={`w-full text-left px-4 py-2 text-sm transition-colors
              ${!value ? 'text-[#7c6dfa] bg-[#7c6dfa15]' : 'text-[#8888a0] hover:bg-[#23232a] hover:text-[#f0f0f5]'}`}
          >
            All
          </button>
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors
                ${value === opt.value
                  ? 'text-[#7c6dfa] bg-[#7c6dfa15]'
                  : 'text-[#8888a0] hover:bg-[#23232a] hover:text-[#f0f0f5]'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}