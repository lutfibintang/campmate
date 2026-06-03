<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseSchedule extends Model
{
    use HasFactory;

    protected $fillable = ['course_id', 'day_of_week', 'start_time', 'end_time', 'room'];

    protected $appends = ['day_label'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function getDayLabelAttribute(): string
    {
        return [
            'monday' => 'Senin',
            'tuesday' => 'Selasa',
            'wednesday' => 'Rabu',
            'thursday' => 'Kamis',
            'friday' => 'Jumat',
            'saturday' => 'Sabtu',
            'sunday' => 'Minggu',
        ][$this->day_of_week] ?? ucfirst((string) $this->day_of_week);
    }
}
