<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionParticipant extends Model
{
    use HasFactory;

    protected $fillable = [
        'study_session_id',
        'user_id',
        'status',
    ];

    public function studySession()
    {
        return $this->belongsTo(StudySession::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
