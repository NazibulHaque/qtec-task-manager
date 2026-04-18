export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-[#8888a0] uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`bg-[#17171a] border rounded-lg px-3 py-2.5 text-sm text-[#f0f0f5]
          placeholder-[#555568] outline-none
          focus:border-[#7c6dfa] focus:ring-1 focus:ring-[#7c6dfa]
          ${error ? 'border-[#fa6d6d]' : 'border-[#2a2a30]'}
          ${className}`}
        {...props}
      />
      {error && <p className="text-[#fa6d6d] text-xs">{error}</p>}
    </div>
  );
}