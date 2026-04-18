import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';

export function useTasks(filters = {}) {
  const [tasks, setTasks]   = useState([]);
  const [stats, setStats]   = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await taskService.getAll(filters);
      setTasks(res.data.data);
      setStats(res.data.stats);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const createTask = async (data) => {
    await taskService.create(data);
    fetchTasks();
  };

  const updateTask = async (id, data) => {
    await taskService.update(id, data);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await taskService.delete(id);
    fetchTasks();
  };

  return { tasks, stats, loading, error, createTask, updateTask, deleteTask, refetch: fetchTasks };
}