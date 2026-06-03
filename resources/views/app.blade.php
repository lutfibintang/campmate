<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title inertia>{{ config('app.name', 'CampusMate') }}</title>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/css/campusmate/theme.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="font-sans antialiased bg-[var(--cm-bg)] text-[var(--cm-text)]">
    @inertia
</body>
</html>
