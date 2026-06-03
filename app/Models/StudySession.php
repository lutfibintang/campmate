<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudySession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'subject_id', 'title', 'description', 'session_type', 'location',
        'meeting_platform', 'meeting_link', 'session_date', 'start_time', 'end_time',
        'max_participants', 'status',
    ];

    protected $casts = ['session_date' => 'date'];
    protected $appends = ['status_label', 'can_join', 'joined_count'];

    public function creator() { return $this->belongsTo(User::class, 'user_id'); }
    public function subject() { return $this->belongsTo(Subject::class); }
    public function participants() { return $this->hasMany(SessionParticipant::class); }
    public function joinedParticipants() { return $this->hasMany(SessionParticipant::class)->where('status', 'joined'); }
    public function comments() { return $this->hasMany(SessionComment::class)->latest(); }

    public function getJoinedCountAttribute(): int
    {
        if ($this->relationLoaded('joinedParticipants')) return $this->joinedParticipants->count();
        return $this->joinedParticipants()->count();
    }

    public function getEndsAtAttribute(): Carbon
    {
        return Carbon::parse($this->session_date->format('Y-m-d').' '.$this->end_time);
    }

    public function getIsExpiredAttribute(): bool
    {
        return $this->ends_at->isPast();
    }

    public function getStatusLabelAttribute(): string
    {
        if ($this->status === 'done' || $this->is_expired) return 'Closed';
        return ucfirst($this->status);
    }

    public function getCanJoinAttribute(): bool
    {
        return in_array($this->status, ['open', 'full'], true) && ! $this->is_expired && $this->joined_count < $this->max_participants;
    }

    public function isJoinedBy(User $user): bool
    {
        return $this->participants()->where('user_id', $user->id)->where('status', 'joined')->exists();
    }

    public function slotsRemaining(): int
    {
        return max(0, $this->max_participants - $this->joinedParticipants()->count());
    }

    public function scopeActive($query)
    {
        $now = now();
        return $query->whereIn('status', ['open', 'full'])
            ->where(function ($q) use ($now) {
                $q->where('session_date', '>', $now->toDateString())
                  ->orWhere(function ($qq) use ($now) {
                      $qq->whereDate('session_date', $now->toDateString())
                         ->whereTime('end_time', '>=', $now->format('H:i:s'));
                  });
            });
    }

    public function scopeArchived($query)
    {
        $now = now();
        return $query->where('status', 'done')
            ->orWhere(function ($q) use ($now) {
                $q->whereIn('status', ['open', 'full'])
                  ->where(function ($qq) use ($now) {
                      $qq->where('session_date', '<', $now->toDateString())
                         ->orWhere(function ($qqq) use ($now) {
                             $qqq->whereDate('session_date', $now->toDateString())
                                 ->whereTime('end_time', '<', $now->format('H:i:s'));
                         });
                  });
            });
    }
}
