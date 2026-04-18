import { Badge } from './ui/Badge';

export function TaskCard({ task, onEdit, onDelete }) {
  const isOverdue = task.due_date && new Date(task.due_date) < new Date()
    && task.status !== 'completed';

  const isCompleted = task.status === 'completed';

  return (
    <div className={`group bg-[#1e1e23] border border-[#2a2a30] rounded-xl p-4
      hover:border-[#7c6dfa] cursor-pointer
      ${isCompleted ? 'opacity-50' : ''}`}>

      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className={`text-sm font-medium text-[#f0f0f5] leading-snug
          ${isCompleted ? 'line-through text-[#8888a0]' : ''}`}>
          {task.title}
        </h3>
        <Badge label={task.priority} type={task.priority} />
      </div>

      {task.description && (
        <p className="text-xs text-[#8888a0] leading-relaxed mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-3">
        {task.due_date ? (
          <span className={`text-xs ${isOverdue ? 'text-[#fa6d6d]' : 'text-[#555568]'}`}>
            {isOverdue ? '⚠ ' : ''}
            {new Date(task.due_date).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric'
            })}
          </span>
        ) : (
          <span />
        )}

        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onEdit(task)}
            className="bg-[#17171a] border border-[#2a2a30] rounded-md px-2.5 py-1
              text-[10px] text-[#8888a0] hover:text-[#f0f0f5] hover:border-[#3a3a45]"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="bg-[#17171a] border border-[#2a2a30] rounded-md px-2.5 py-1
              text-[10px] text-[#fa6d6d] hover:bg-[#3d1a1a] hover:border-[#5a2020]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}