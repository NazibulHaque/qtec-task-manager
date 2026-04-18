import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useDebounce } from '../hooks/useDebounce';
import { TaskBoard } from '../components/TaskBoard';
import { TaskForm } from '../components/TaskForm';
import { SearchBar } from '../components/SearchBar';
import { FilterDropdown } from '../components/FilterDropdown';
import { Button } from '../components/ui/Button';

export default function Home() {
  const [search, setSearch]     = useState('');
  const [status, setStatus]     = useState('');
  const [priority, setPriority] = useState('');
  const [modal, setModal]       = useState(null);
  const [saving, setSaving]     = useState(false);

  const debouncedSearch = useDebounce(search, 400);
  const filters = {
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(status   && { status }),
    ...(priority && { priority }),
  };

  const { tasks, stats, loading, error, createTask, updateTask, deleteTask } = useTasks(filters);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      if (modal?.id) await updateTask(modal.id, data);
      else await createTask(data);
      setModal(null);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) await deleteTask(id);
  };

  const hasFilters = search || status || priority;

  return (
    <div className="flex flex-col h-screen bg-[#0f0f11] overflow-hidden">

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4
        border-b border-[#2a2a30] bg-[#17171a] shrink-0">
        <h1 className="text-lg font-bold text-[#f0f0f5] tracking-tight"
          style={{ fontFamily: 'Syne, sans-serif' }}>
          task<span className="text-[#7c6dfa]">flow</span>
        </h1>
        <Button onClick={() => setModal('create')}>+ New Task</Button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 px-6 py-4 border-b border-[#2a2a30] shrink-0">
        {[
          { label: 'Total',       value: stats?.total,       color: '#7c6dfa' },
          { label: 'Pending',     value: stats?.pending,     color: '#faad6d' },
          { label: 'In Progress', value: stats?.in_progress, color: '#6db8fa' },
          { label: 'Completed',   value: stats?.completed,   color: '#6dfabc' },
        ].map(s => (
          <div key={s.label}
            className="bg-[#1e1e23] border border-[#2a2a30] rounded-xl px-4 py-3">
            <p className="text-2xl font-bold" style={{ color: s.color, fontFamily: 'Syne, sans-serif' }}>
              {s.value ?? 0}
            </p>
            <p className="text-xs text-[#8888a0] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-[#2a2a30] shrink-0">
        <SearchBar onSearch={setSearch} />
        <FilterDropdown label="Status" value={status} onChange={setStatus}
          options={[
            { value: 'pending',     label: 'Pending'     },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'completed',   label: 'Completed'   },
          ]} />
        <FilterDropdown label="Priority" value={priority} onChange={setPriority}
          options={[
            { value: 'low',    label: 'Low'    },
            { value: 'medium', label: 'Medium' },
            { value: 'high',   label: 'High'   },
          ]} />
        {hasFilters && (
          <button
            onClick={() => { setSearch(''); setStatus(''); setPriority(''); }}
            className="text-xs text-[#8888a0] hover:text-[#f0f0f5] px-2 py-1">
            ✕ Clear
          </button>
        )}
      </div>

      {/* Board */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-[#8888a0] text-sm">
          Loading tasks...
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center text-[#fa6d6d] text-sm">
          {error}
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          <TaskBoard tasks={tasks} onEdit={setModal} onDelete={handleDelete} />
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center
          justify-center z-50 p-4">
          <div className="bg-[#17171a] border border-[#2a2a30] rounded-2xl
            shadow-2xl w-full max-w-md p-6">
            <h2 className="text-base font-semibold text-[#f0f0f5] mb-5"
              style={{ fontFamily: 'Syne, sans-serif' }}>
              {modal === 'create' ? 'New Task' : 'Edit Task'}
            </h2>
            <TaskForm
              initial={modal === 'create' ? undefined : modal}
              onSubmit={handleSubmit}
              onCancel={() => setModal(null)}
              loading={saving}
            />
          </div>
        </div>
      )}
    </div>
  );
}