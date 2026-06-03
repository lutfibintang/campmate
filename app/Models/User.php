<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['name', 'email', 'password', 'role', 'phone', 'profile_photo'];
    protected $hidden = ['password', 'remember_token'];
    protected $appends = ['profile_photo_url'];

    protected function casts(): array
    {
        return ['email_verified_at' => 'datetime', 'password' => 'hashed'];
    }

    public function studySessions() { return $this->hasMany(StudySession::class); }
    public function joinedSessions() { return $this->belongsToMany(StudySession::class, 'session_participants')->withPivot('status')->withTimestamps(); }
    public function skills() { return $this->belongsToMany(Skill::class, 'user_skills')->withTimestamps(); }
    public function courses() { return $this->hasMany(Course::class); }
    public function isAdmin(): bool { return $this->role === 'admin'; }

    public function getProfilePhotoUrlAttribute(): ?string
    {
        return $this->profile_photo ? asset('storage/'.$this->profile_photo) : null;
    }
}
