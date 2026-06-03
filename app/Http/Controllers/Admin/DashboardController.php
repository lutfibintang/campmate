<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'users' => Schema::hasTable('users') ? DB::table('users')->count() : 0,
                'admins' => Schema::hasTable('users') ? DB::table('users')->where('role', 'admin')->count() : 0,
                'sessions' => Schema::hasTable('study_sessions') ? DB::table('study_sessions')->count() : 0,
                'classes' => Schema::hasTable('course_schedules') ? DB::table('course_schedules')->count() : 0,
            ],
        ]);
    }
}
