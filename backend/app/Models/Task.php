<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'status', 'priority', 'due_date'
    ];

    protected $casts = [
        'due_date' => 'date',
    ];

    public function scopePending($query) { return $query->where('status', 'pending'); }
    public function scopeInProgress($query) { return $query->where('status', 'in_progress'); }
    public function scopeCompleted($query) { return $query->where('status', 'completed'); }

    public function scopeSearch($q, $term) {
        return $q->where('title', 'like', "%{$term}%")
                 ->orWhere('description', 'like', "%{$term}%");
    }
}
