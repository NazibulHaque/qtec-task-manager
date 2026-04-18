export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg cursor-pointer border transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary:   'bg-[#7c6dfa] hover:bg-[#6a5ce8] text-white border-transparent',
    secondary: 'bg-[#1e1e23] hover:bg-[#23232a] text-[#f0f0f5] border-[#2a2a30]',
    danger:    'bg-[#3d1a1a] hover:bg-[#4d2020] text-[#fa6d6d] border-[#5a2020]',
    ghost:     'bg-transparent hover:bg-[#1e1e23] text-[#8888a0] border-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}