<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::query();

        // Search
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by priority
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        $tasks = $query->latest()->get();

        return TaskResource::collection($tasks)->additional([
            'stats' => [
                'total'       => Task::count(),
                'pending'     => Task::pending()->count(),
                'in_progress' => Task::inProgress()->count(),
                'completed'   => Task::completed()->count(),
            ]
        ]);
    }

    public function store(TaskRequest $request)
    {
        $task = Task::create($request->validated());
        return new TaskResource($task);
    }

    public function show(Task $task)
    {
        return new TaskResource($task);
    }

    public function update(TaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
}
