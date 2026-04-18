import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const EMPTY = { title: '', description: '', status: 'pending', priority: 'medium', due_date: '' };

const selectClass = `w-full bg-[#17171a] border border-[#2a2a30] rounded-lg px-3 py-2.5
  text-sm text-[#f0f0f5] outline-none focus:border-[#7c6dfa] focus:ring-1 focus:ring-[#7c6dfa]`;

export function TaskForm({ initial = EMPTY, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Title" value={form.title} onChange={set('title')}
        error={errors.title} placeholder="What needs to be done?" />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[#8888a0] uppercase tracking-wider">
          Description
        </label>
        <textarea value={form.description} onChange={set('description')} rows={3}
          placeholder="Optional details..."
          className={`${selectClass} resize-none placeholder-[#555568]`} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8888a0] uppercase tracking-wider">Status</label>
          <select value={form.status} onChange={set('status')} className={selectClass}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8888a0] uppercase tracking-wider">Priority</label>
          <select value={form.priority} onChange={set('priority')} className={selectClass}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <Input label="Due Date" type="date" value={form.due_date} onChange={set('due_date')} />

      <div className="flex gap-3 justify-end pt-2 border-t border-[#2a2a30]">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : initial?.id ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}