# CampusMate Inertia React Study-Only Patch

Patch ini mengubah arah CampusMate menjadi **Laravel + Inertia React** dengan fokus Study Together saja.
Lost & Found tidak dipakai lagi karena modul itu dibuat oleh project teman.

## Yang ditambahkan

1. UI full React untuk halaman utama aplikasi via Inertia.
2. Palette baru: charcoal + warm sage/olive, bukan biru AI SaaS.
3. Study Together tetap jadi core feature.
4. Semester Schedule / Jadwal Mata Kuliah semester ini.
5. Conflict Warning saat join Study Session yang bentrok jadwal kuliah.
6. Calendar View gabungan jadwal MK dan Study Session.
7. Leaderboard & Badges.
8. React components untuk date/time/photo picker, search debounce, menu drawer, cards.
9. Session expired logic: sesi yang lewat jadi `done`, UI tampil `Closed`, dan join disabled.

## Install dependency dulu

Jalankan di root project:

```bash
composer require inertiajs/inertia-laravel
npm install @inertiajs/react react react-dom @vitejs/plugin-react
```

Kalau auth lu masih Breeze Blade dan lu mau auth full React juga, jalankan sebelum apply patch:

```bash
composer require laravel/breeze --dev
php artisan breeze:install react
npm install
```

Setelah itu copy/replace file patch ini ke root project.

## Setelah copy patch

```bash
php artisan migrate
php artisan view:clear
php artisan optimize:clear
npm run build
php artisan serve
```

## Git workflow aman

```bash
git checkout -b migrate-inertia-study
# copy patch
git add bootstrap/app.php routes/web.php app/Http app/Models database/migrations resources/js resources/views/app.blade.php resources/css/campusmate/theme.css vite.config.js
git commit -m "migrate campusmate to inertia react study platform"
git push -u origin migrate-inertia-study
```

## Catatan penting

- Patch ini sengaja tidak menghapus migration/model Lost & Found lama supaya database history tidak rusak.
- Route/menu Lost & Found tidak dipakai lagi.
- Kalau muncul error route auth, pastikan `routes/auth.php` masih ada dari Breeze.
- Kalau muncul error Inertia middleware, pastikan `composer require inertiajs/inertia-laravel` sudah jalan.
