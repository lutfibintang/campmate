<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('Profile/Edit', ['user' => $request->user()]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'profile_photo' => ['nullable', 'image', 'max:2048'],
        ]);

        $user = $request->user();
        if ($request->hasFile('profile_photo')) {
            if ($user->profile_photo) Storage::disk('public')->delete($user->profile_photo);
            $data['profile_photo'] = $request->file('profile_photo')->store('profiles', 'public');
        } else {
            unset($data['profile_photo']);
        }
        $user->fill($data)->save();

        return Redirect::route('profile.edit')->with('success', 'Profile updated.');
    }

    public function destroy(Request $request)
    {
        abort(403, 'Account deletion not implemented in this patch.');
    }
}
