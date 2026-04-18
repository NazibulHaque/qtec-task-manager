import { TaskCard } from './TaskCard';

const COLUMNS = [
  { key: 'pending',     label: 'Pending',     accent: '#faad6d' },
  { key: 'in_progress', label: 'In Progress',  accent: '#6db8fa' },
  { key: 'completed',   label: 'Completed',    accent: '#6dfabc' },
];

export function TaskBoard({ tasks, onEdit, onDelete }) {
  const grouped = tasks.reduce((acc, task) => {
    acc[task.status] = [...(acc[task.status] || []), task];
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-3 gap-4 p-6 overflow-y-auto flex-1">
      {COLUMNS.map(col => (
        <div key={col.key}
          className="bg-[#17171a] border border-[#2a2a30] rounded-2xl p-4 flex flex-col gap-3">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-[#8888a0] uppercase tracking-widest"
                style={{ fontFamily: 'Syne, sans-serif' }}>
                {col.label}
              </span>
              <span className="bg-[#1e1e23] border border-[#2a2a30] rounded-full
                px-2.5 py-0.5 text-xs text-[#8888a0]">
                {(grouped[col.key] || []).length}
              </span>
            </div>
            <div className="h-0.5 rounded-full" style={{ background: col.accent, opacity: 0.6 }} />
          </div>

          <div className="flex flex-col gap-2.5">
            {(grouped[col.key] || []).length === 0 ? (
              <div className="text-center py-10 text-[#555568] text-xs">
                No tasks here
              </div>
            ) : (
              (grouped[col.key] || []).map(task => (
                <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}