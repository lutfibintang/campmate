# CampMate / CampusMate Inertia React Build Hotfix

Patch ini membetulkan error build yang muncul setelah migrasi ke Inertia React:

- `Could not resolve './bootstrap'` → menambahkan `resources/js/bootstrap.js`.
- `Field / SelectInput / TextInput / TextArea is not exported` → mengganti `resources/js/Components/TextInput.jsx` dengan named exports yang benar.
- `root.render()` kosong di `app.jsx` → memastikan Inertia render `<App {...props} />`.
- Menjaga entry Inertia tetap menggunakan `resources/js/app.jsx`.

## Cara pakai

1. Extract ZIP ini.
2. Copy semua isi folder patch ke root project Laravel lu.
3. Replace file lama.
4. Jalankan:

```bash
npm install axios @inertiajs/react react react-dom
npm install -D @vitejs/plugin-react@^6
npm run build
php artisan optimize:clear
php artisan serve
```

Kalau `npm run build` berhasil, baru commit ke branch, jangan langsung main.
