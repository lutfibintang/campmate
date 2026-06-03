<?php

namespace App\Providers;

use App\Models\StudySession;
use App\Policies\StudySessionPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Gate::policy(StudySession::class, StudySessionPolicy::class);
    }
}
