<?php

namespace App\Policies;

use App\Models\StudySession;
use App\Models\User;

class StudySessionPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    public function update(User $user, StudySession $studySession): bool
    {
        return (int) $studySession->user_id === (int) $user->id;
    }

    public function delete(User $user, StudySession $studySession): bool
    {
        return (int) $studySession->user_id === (int) $user->id;
    }
}
