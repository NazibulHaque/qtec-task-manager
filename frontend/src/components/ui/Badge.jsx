export function Badge({ label, type }) {
  const styles = {
    high:        'bg-[#3d1a1a] text-[#fa6d6d]',
    medium:      'bg-[#2d2510] text-[#faad6d]',
    low:         'bg-[#1a2d1a] text-[#6dfa8d]',
    pending:     'bg-[#2d2510] text-[#faad6d]',
    in_progress: 'bg-[#1a1f3d] text-[#6db8fa]',
    completed:   'bg-[#1a2d25] text-[#6dfabc]',
  };

  const labels = {
    in_progress: 'In Progress',
  };

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${styles[type] || 'bg-[#1e1e23] text-[#8888a0]'}`}>
      {labels[label] || label?.charAt(0).toUpperCase() + label?.slice(1)}
    </span>
  );
}